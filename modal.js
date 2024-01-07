let selectedSize = "s";

function openModal(item, imageUrl) {
  const modal = document.querySelector(".modal");
  const modalImg = modal.querySelector(".modal-img");
  const modalContent = modal.querySelector(".modal-content");
  const selectedSizeElement = modalContent.querySelector(".selected-size");
  const selectedAdditivesElement = modalContent.querySelector(
    ".item-additives div"
  );

  // Set the modal image
  modalImg.style.backgroundImage = `url('${imageUrl}')`;

  // Populate modal content with item details
  modalContent.querySelector("h3").textContent = item.name;
  modalContent.querySelector("p").textContent = item.description;

  const sizesContainer = modalContent.querySelector(".item-sizes");
  sizesContainer.innerHTML = "";

  Object.keys(item.sizes).forEach((sizeKey) => {
    const size = item.sizes[sizeKey];

    const sizeLink = document.createElement("a");
    sizeLink.href = "#";
    sizeLink.onclick = () => selectSize(sizeKey); // Call the selectSize function on click

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
  // function updatePrice() {
  //   // Assuming 'item' is the product object with the initial price
  //   let finalPrice = parseFloat(item.price);

  //   // Adjust the final price based on the selected size
  //   if (selectedSize === "m") {
  //     finalPrice += 0.5;
  //   } else if (selectedSize === "l") {
  //     finalPrice += 1.0;
  //   }

  //   // Adjust the final price based on selected additives (you'll need to implement this logic)
  //   // For example, you might have an array of selected additives and add their prices here

  //   // Update the displayed price in the modal
  //   const costDiv = modalContent.querySelector(".cost");
  //   costDiv.textContent = `$${finalPrice.toFixed(2)}`;
  // }
  // function updatePrice() {
  //   // Assuming 'item' is the product object with the initial price
  //   let finalPrice = parseFloat(item.price);

  //   // Adjust the final price based on the selected size
  //   if (selectedSize === "m") {
  //     finalPrice += 0.5;
  //   } else if (selectedSize === "l") {
  //     finalPrice += 1.0;
  //   }

  //   // Adjust the final price based on selected additives
  //   const selectedAdditives = getSelectedAdditives();
  //   selectedAdditives.forEach(() => {
  //     finalPrice += 0.5; // Each selected additive increases the price by $0.50
  //   });

  //   // Update the displayed price in the modal
  //   const costDiv = modalContent.querySelector(".cost");
  //   costDiv.textContent = `$${finalPrice.toFixed(2)}`;

  //   // Display the selected additives to the user
  //   const selectedAdditivesDiv = modalContent.querySelector(
  //     ".item-additives div"
  //   );
  //   selectedAdditivesDiv.textContent = selectedAdditives
  //     .map((additive) => additive.name)
  //     .join(", ");
  // }
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
      ".selected-additives"
    );
    selectedAdditivesDiv.textContent = selectedAdditives
      .map((additive) => additive.name)
      .join(", ");
  }

  // Helper function to get selected additives
  // function getSelectedAdditives() {
  //   const selectedAdditives = [];
  //   const additiveOptions = modalContent.querySelectorAll(
  //     ".item-additives div"
  //   );
  //   additiveOptions.forEach((additiveOption, index) => {
  //     if (additiveOption.classList.contains("selected")) {
  //       selectedAdditives.push(item.additives[index]);
  //     }
  //   });
  //   return selectedAdditives;
  // }

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

  // const additiveOptions = modalContent.querySelectorAll(".item-additives div");
  // additiveOptions.forEach((additiveOption) => {
  //   additiveOption.addEventListener("click", () => {
  //     // Handle the logic for adding or removing additives
  //     updatePrice();
  //   });
  // });

  const additiveOptions = modalContent.querySelectorAll(".item-additives div");
  additiveOptions.forEach((additiveOption, index) => {
    additiveOption.addEventListener("click", () => {
      additiveOption.classList.toggle("selected-additives");
      updatePrice();
    });
  });

  // Populate additives
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

  // Assuming 'selectSize' is the variable containing the selected size

  // Set button text
  const button = modalContent.querySelector("button");
  button.textContent = "Add to Cart";

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

  // Add your logic to update the UI based on the selected size
  // For example, you can highlight the selected size in the modal
  updateSizeUI();
}

// Function to update the UI based on the selected size
function updateSizeUI() {
  // Add your logic to update the UI based on the selected size
  // For example, you can highlight the selected size in the modal
  // Access the selected size using the 'selectedSize' variable
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
