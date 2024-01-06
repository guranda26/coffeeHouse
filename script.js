document.addEventListener("DOMContentLoaded", function () {
  const burgLinks = document.querySelectorAll(".burg-link");

  burgLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const hrefAttribute = link.getAttribute("href");
      if (hrefAttribute) {
        const targetId = hrefAttribute.substring(1);
        const targetSection = document.getElementById(targetId);

        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start",
            duration: "3000",
          });
        }
      }
    });
  });
});
const burgIcon = document.getElementById("burger-icon");
const navMenu = document.querySelector(".nav-menu");

burgIcon.addEventListener("click", () => {
  let textShow = document.querySelector(".text-content");

  if (navMenu.classList.contains("show-menu")) {
    navMenu.classList.remove("show-menu");
    navMenu.classList.add("hide-menu");
    textShow.style.display = "none";
  } else {
    navMenu.classList.add("show-menu");
    navMenu.classList.remove("hide-menu");
    textShow.style.display = "block";
  }

  const targetSection = document.getElementById("main-menu");
  if (targetSection) {
    targetSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
});

const clickMenu = document.getElementById("menu-click-btn");
clickMenu.addEventListener("click", () => {
  console.log("hh");
  navMenu.classList.remove("burger-icon");
});

const rightArrowButton = document.querySelector(".arrow");

const clickRightArrow = () => {
  rightArrowButton.click();
};

const intervalDuration = 5000;
setInterval(clickRightArrow, intervalDuration);
