const slider = [
  {
    source: "./assets/coffee-slider-1.png",
    thumbnail: "Frappuccino",
    title: "S’mores Frappuccino",
    description:
      "This new drink takes an espresso and mixes it with brown sugar and cinnamon before being topped with oat milk",
    price: "$5.50",
  },
  {
    source: "./assets/coffee-slider-2.png",
    thumbnail: "Caramel Macchiato",
    title: "Caramel Macchiato",
    description:
      "Fragrant and unique classic espresso with rich caramel-peanut syrup, with cream under whipped thick foam.",
    price: "$5.00",
  },
  {
    source: "./assets/coffee-slider-3.png",
    thumbnail: "Ice coffee",
    title: "Ice coffee",
    description:
      "A popular summer drink that tones and invigorates. Prepared from coffee, milk and ice.",
    price: "$4.50",
  },
];

const sliderContainer = document.querySelector("#slider-coffee");
const sliderLines = document.querySelectorAll(".slider-line");
const rightButton = document.querySelector(".arrow");
const leftButton = document.querySelector(".left");
let currentIndex = 0;
let interval;
let startX,
  startY,
  threshold = 50;

function showSlide(index) {
  sliderContainer.innerHTML = "";
  const article = document.createElement("article");
  article.innerHTML = `
    <img src="${slider[index].source}" alt="${slider[index].thumbnail}" />
    <h3>${slider[index].title}</h3>
    <p>${slider[index].description}</p>
    <p>${slider[index].price}</p>
  `;

  sliderLines.forEach((line, i) => {
    line.style.backgroundColor = i === index ? "#403f3d" : "#c1b6ad";
  });
  sliderContainer.appendChild(article);
}

function startSlider() {
  showSlide(currentIndex);
  interval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slider.length;
    showSlide(currentIndex);
  }, 5000);
}

function pauseSlider() {
  clearInterval(interval);
}

function handleSwipe(startX, currentX) {
  let diffX = startX - currentX;

  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      pauseSlider();
      currentIndex = (currentIndex + 1) % slider.length;
      showSlide(currentIndex);
      startSlider();
    } else {
      pauseSlider();
      currentIndex = (currentIndex - 1 + slider.length) % slider.length;
      showSlide(currentIndex);
      startSlider();
    }
  }
}

function touchStartHandler(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
}

function touchMoveHandler(event) {
  let currentX = event.touches[0].clientX;
  let currentY = event.touches[0].clientY;

  handleSwipe(startX, currentX);
}

document.addEventListener("touchstart", touchStartHandler, false);
document.addEventListener("touchmove", touchMoveHandler, false);

rightButton.addEventListener("click", () => {
  pauseSlider();
  currentIndex = (currentIndex + 1) % slider.length;
  showSlide(currentIndex);
  startSlider();
});

leftButton.addEventListener("click", () => {
  pauseSlider();
  currentIndex = (currentIndex - 1 + slider.length) % slider.length;
  showSlide(currentIndex);
  startSlider();
});

document.addEventListener("DOMContentLoaded", () => {
  startSlider();

  sliderContainer.addEventListener("mouseenter", pauseSlider);
  sliderContainer.addEventListener("mouseleave", startSlider);

  sliderContainer.addEventListener("mousedown", () => {
    pauseSlider();
    sliderContainer.addEventListener("mouseup", startSlider, { once: true });
  });
});
