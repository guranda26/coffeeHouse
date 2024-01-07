let selectedSize = "s";

function openModal(item, imageUrl) {
  const modal = document.querySelector(".modal");
  const modalImg = modal.querySelector(".modal-img");
  const modalContent = modal.querySelector(".modal-content");
  const selectedSizeElement = modalContent.querySelector(".selected-size");
  const selectedAdditivesElement = modalContent.querySelector(
    ".item-additives div"
  );

  modalImg.style.backgroundImage = `url('${imageUrl}')`;

  modalContent.querySelector("h3").textContent = item.name;
  modalContent.querySelector("p").textContent = item.description;

  const sizesContainer = modalContent.querySelector(".item-sizes");
  sizesContainer.innerHTML = "";

  Object.keys(item.sizes).forEach((sizeKey) => {
    const size = item.sizes[sizeKey];

    const sizeLink = document.createElement("a");
    sizeLink.href = "#";
    sizeLink.onclick = () => selectSize(sizeKey);

    const sizeSpan1 = document.createElement("span");
    sizeSpan1.textContent = sizeKey;

    const sizeSpan2 = document.createElement("span");
    sizeSpan2.textContent = size.size;

    sizeLink.appendChild(sizeSpan1);
    sizeLink.appendChild(sizeSpan2);

    const sizeDiv = document.createElement("div");
    sizeDiv.appendChild(sizeLink);

    sizesContainer.appendChild(sizeDiv);
  });

  function updatePrice() {
    let finalPrice = parseFloat(item.price);

    if (selectedSize === "m") {
      finalPrice += 0.5;
    } else if (selectedSize === "l") {
      finalPrice += 1.0;
    }

    const selectedAdditives = getSelectedAdditives();
    selectedAdditives.forEach(() => {
      finalPrice += 0.5;
    });

    const costDiv = modalContent.querySelector(".cost");
    costDiv.textContent = `$${finalPrice.toFixed(2)}`;

    const selectedAdditivesDiv = modalContent.querySelector(
      ".item-additives div"
    );
    selectedAdditivesDiv.textContent = selectedAdditives
      .map((additive) => additive.name)
      .join(", ");
  }

  function getSelectedAdditives() {
    const selectedAdditives = [];
    const additiveOptions = modalContent.querySelectorAll(
      ".item-additives div"
    );
    additiveOptions.forEach((additiveOption, index) => {
      if (additiveOption.classList.contains("selected-additives")) {
        selectedAdditives.push(item.additives[index]);
      }
    });
    return selectedAdditives;
  }
  const sizeOptions = modalContent.querySelectorAll(".item-sizes a");
  sizeOptions.forEach((sizeOption) => {
    sizeOption.addEventListener("click", (event) => {
      event.preventDefault();
      selectedSize = sizeOption.querySelector("span").textContent.toLowerCase();
      updatePrice();
    });
  });

  const additiveOptions = modalContent.querySelectorAll(".item-additives div");
  additiveOptions.forEach((additiveOption, index) => {
    additiveOption.addEventListener("click", () => {
      additiveOption.classList.toggle("selected-additives");

      updatePrice();
    });
    const additiveOptions = modalContent.querySelectorAll(
      ".item-additives div"
    );
  });

  const additivesContainer = modalContent.querySelector(".item-additives div");
  additivesContainer.innerHTML = "";
  item.additives.forEach((additive) => {
    const additiveDiv = document.createElement("div");
    additiveDiv.textContent = additive.name;
    additivesContainer.appendChild(additiveDiv);
  });

  const totalArticle = modalContent.querySelector(".total");
  totalArticle.textContent = "Total:";

  const costDiv = modalContent.querySelector(".cost");
  costDiv.textContent = `$${item.price}`;

  const button = modalContent.querySelector("button");
  button.textContent = "Add to Cart";

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

window.onclick = function (event) {
  const modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
};

function selectSize(size) {
  selectedSize = size;

  updateSizeUI();
}

function updateSizeUI() {
  console.log("Selected size:", selectedSize);
}

window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
};
