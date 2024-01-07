const button = document.querySelector(".load-btn");
document.addEventListener("DOMContentLoaded", function () {
  const coffeeMenuContainer = document.querySelector("#coffee-offer");
  const teaMenuContainer = document.querySelector("#tea-offer");
  const dessertContainer = document.querySelector("#dessert-offer");

  const images = Array.from({ length: 8 }, (_, index) => ({
    src: `/assets/coffee-menu-${index + 1}.jpeg`,
  }));
  const teaImages = Array.from({ length: 4 }, (_, index) => ({
    src: `/assets/tea-${index + 1}.png`,
  }));
  const dessertImages = Array.from({ length: 8 }, (_, index) => ({
    src: `/assets/dessert-${index + 1}.png`,
  }));

  fetch("./products.json")
    .then((response) => response.json())
    .then((products) => {
      // Display coffee items
      products.slice(0, 8).forEach((coffeeProduct, index) => {
        coffeeMenuItems(coffeeProduct, images[index], coffeeMenuContainer);
      });

      // Display tea  items
      products.slice(8, 12).forEach((teaProduct, index) => {
        coffeeMenuItems(teaProduct, teaImages[index], teaMenuContainer);
      });
      //Display dessert items
      products.slice(12, 20).forEach((dessertProduct, index) => {
        coffeeMenuItems(dessertProduct, dessertImages[index], dessertContainer);
      });
    })
    .catch((error) => console.error("Error fetching product data: ", error));

  function coffeeMenuItems(item, image, container) {
    if (!image || typeof image.src === "undefined") {
      console.error(`Image not available for ${item.name}`);
      return;
    }

    const article = document.createElement("article");
    article.classList.add("menu-items");

    article.addEventListener("click", () => openModal(item, image.src));

    article.innerHTML = `
      <div class="layout"><img src="${image.src}" alt="${item.name}" /></div>
      <div class="text-container">
        <div class="title">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
        <span>&dollar;${item.price}</span>
      </div>
      
    `;

    container.appendChild(article);
  }
});

function loadMore() {
  const menuItems = document.querySelectorAll(".menu-items");
  menuItems.forEach((item, index) => {
    if (index >= 4) {
      item.style.display = "block";
      button.style.display = "none";
    }
  });

  console.log("clicked");
}

function checkLoad() {
  const menuItems = document.querySelectorAll(".menu-items");

  menuItems.forEach((item, index) => {
    if (index >= 8 && item.style.display === "block") {
      button.removeEventListener("click", loadMore);
    }
  });

  console.log("checked");
}

const teaTab = document.getElementById("tea-offer");
const coffeeTab = document.getElementById("coffee-offer");
const dessertTab = document.getElementById("dessert-offer");
// Add click event listener to the tabs
function showCoffeeMenu() {
  coffeeTab.style.display = "flex";
  teaTab.style.display = "none";
  dessertTab.style.display = "none";
  document.querySelector("#coffee-menu").classList.add("active");
  document.querySelector("#tea-menu").classList.remove("active");
  document.querySelector("#dessert-menu").classList.remove("active");
  button.classList.remove("hidden-btn");

  button.addEventListener("click", loadMore);
}
function showTeaMenu() {
  coffeeTab.style.display = "none";
  dessertTab.style.display = "none";
  teaTab.style.display = "flex";
  document.querySelector("#tea-menu").classList.add("active");
  document.querySelector("#coffee-menu").classList.remove("active");
  document.querySelector("#dessert-menu").classList.remove("active");
  button.classList.add("hidden-btn");
}

function showDessertMenu() {
  coffeeTab.style.display = "none";
  dessertTab.style.display = "flex";
  teaTab.style.display = "none";

  document.querySelector("#dessert-menu").classList.add("active");
  document.querySelector("#tea-menu").classList.remove("active");
  document.querySelector("#coffee-menu").classList.remove("active");
  button.classList.remove("hidden-btn");

  button.addEventListener("click", checkLoad);
  button.addEventListener("click", loadMore);
}

showCoffeeMenu();
