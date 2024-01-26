let selectedSize = "s";

function openModal(item, imageUrl) {
  const modal = document.querySelector(".modal");
  const modalImg = modal.querySelector(".modal-img");
  const modalContent = modal.querySelector(".modal-content");

  console.log(imageUrl);
  modalContent.style.height = "150%";
  // modal.style.height = "150%";

  modalImg.style.backgroundImage = `url('${imageUrl}')`;
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = item.name;

  modalImg.innerHTML = "";

  modalImg.appendChild(img);

  document.body.style.overflow = "hidden";

  modalContent.querySelector("h3").textContent = item.name;
  modalContent.querySelector("p").textContent = item.description;

  const sizesContainer = modalContent.querySelector(".item-sizes");
  sizesContainer.innerHTML = "";
  const sizesHeading = document.createElement("h4");
  sizesHeading.innerHTML = "Size";

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

    sizesContainer.append(sizeDiv);
  });

  function updatePrice() {
    let finalPrice = parseFloat(item.price);

    if (selectedSize === "m") {
      finalPrice += 0.5;
    } else if (selectedSize === "l") {
      finalPrice += 1.0;
    }

    const selectedAdditives = getSelectedAdditives();
    finalPrice += selectedAdditives.length * 0.5;

    const costDiv = modalContent.querySelector(".cost");
    costDiv.textContent = `$${finalPrice.toFixed(2)}`;

    const selectedAdditivesDiv = modalContent.querySelector(
      ".item-additives .selected-additives"
    );

    if (selectedAdditivesDiv) {
      selectedAdditivesDiv.textContent = selectedAdditives
        .map((additive) => additive.name)
        .join(", ");
    }
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
  });

  const additivesContainer = modalContent.querySelector(".item-additives div");
  additivesContainer.innerHTML = "";
  item.additives.forEach((additive) => {
    const additiveDiv = document.createElement("div");
    additiveDiv.textContent = additive.name;
    additivesContainer.appendChild(additiveDiv);
  });

  // Display total price
  const totalArticle = modalContent.querySelector(".total");
  totalArticle.textContent = "Total:";

  // Display cost
  const costDiv = modalContent.querySelector(".cost");
  costDiv.textContent = `$${item.price}`;

  const button = modalContent.querySelector("button");
  button.textContent = "Close";

  // Show the modal
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
  console.log(selectedSize);
}

// Close the modal if the user clicks outside the modal content
window.onclick = function (event) {
  var modal = document.getElementById("myModal");
  if (event.target === modal) {
    closeModal();
  }
};
