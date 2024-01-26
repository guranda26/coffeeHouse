document.addEventListener("DOMContentLoaded", function () {
  const modal = document.createElement("div");
  modal.classList.add("modal");
  const content = document.createElement("div");
  content.className = "content";
  const img = document.createElement("img");
  img.setAttribute("src", "./assets/game-over.jpeg");
  const heading = document.createElement("h4");
  heading.textContent = "Game Over!";
  const textContent = document.createElement("p");
  textContent.innerHTML = "The correct word was: <b>moon</b>";
  const btn = document.createElement("button");
  btn.className = "play-again";
  btn.textContent = "Try Again";
  content.append(img, heading, textContent, btn);
  modal.appendChild(content);

  const container = document.createElement("div");
  container.classList.add("container");

  const box = document.createElement("div");
  box.classList.add("box");
  const imgHangMan = document.createElement("img");
  imgHangMan.setAttribute("src", "assets/hangman-0.svg");
  imgHangMan.alt = "hangman-img";
  const headingOne = document.createElement("h1");
  headingOne.textContent = "Hangman Game";
  box.append(imgHangMan, headingOne);

  const gameBox = document.createElement("div");
  gameBox.classList.add("game-box");
  const words = document.createElement("ul");
  words.classList.add("display");
  const hint = document.createElement("h4");
  hint.classList.add("hint");
  hint.innerHTML = "Hint: <b></b>";
  const incorrect = document.createElement("h4");
  incorrect.classList.add("guesses-text");
  incorrect.innerHTML = "Incorrect guesses: <b>0 / 6</b>";
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");
  gameBox.append(words, hint, incorrect, keyboard);
  container.append(box, gameBox);

  document.body.append(modal, container);

  let current, correct, wrong;
  const max = 6;

  const reset = () => {
    correct = [];
    wrong = 0;
    imgHangMan.src = "./assets/hangman-0.svg";
    incorrect.innerText = `${wrong} / ${max}`;
    words.innerHTML = current
      .split("")
      .map(() => `<li class="letter"></li>`)
      .join("");
    keyboard
      .querySelectorAll("button")
      .forEach((button) => (button.disabled = false));
    modal.classList.remove("show-modal");
  };

  const randomWord = () => {
    const { word, hint } =
      wordList[Math.floor(Math.random() * wordList.length)];
    current = word;
    document.querySelector(".hint b").innerText = hint;
    reset();
  };

  const gameOver = (wordGuess) => {
    const modalText = wordGuess
      ? `You guessed the word:`
      : "The correct word was:";
    modal.querySelector("img").src = `assets/${
      wordGuess ? "you-won" : "game-over"
    }.jpeg`;
    modal.querySelector("h4").innerText = wordGuess
      ? "Congrats, you won the game!"
      : "Game Over! You lost";
    modal.querySelector("p").innerHTML = `${modalText} <b>${current}</b>`;
    modal.classList.add("show-modal");
  };

  const checkGame = (button, clickedLetter) => {
    if (current.includes(clickedLetter)) {
      [...current].forEach((letter, index) => {
        if (letter === clickedLetter) {
          correct.push(letter);
          words.querySelectorAll("li")[index].innerText = letter;
          words.querySelectorAll("li")[index].classList.add("guessed");
        }
      });
    } else {
      wrong++;
      imgHangMan.src = `assets/hangman-${wrong}.svg`;
    }
    button.disabled = true;
    incorrect.innerText = `${wrong} / ${max}`;

    if (wrong === max) return gameOver(false);
    if (correct.length === current.length) return gameOver(true);
  };

  for (let i = 97; i <= 122; i++) {
    const btn = document.createElement("button");
    btn.innerText = String.fromCharCode(i);
    keyboard.appendChild(btn);
    btn.addEventListener("click", (e) =>
      checkGame(e.target, String.fromCharCode(i))
    );
  }
  document.addEventListener("keydown", (event) => {
    const key = event.key.toLowerCase();
    if (key >= "a" && key <= "z" && !modal.classList.contains("show-modal")) {
      // console.log(`Keydown event triggered: ${key}`);
      // console.log("Key is a letter and game is active.");

      const button = Array.from(keyboard.querySelectorAll("button")).find(
        (btn) => btn.textContent === key && !btn.disabled
      );
      if (button) {
        checkGame(button, key);
      }
    }
  });

  randomWord();
  btn.addEventListener("click", randomWord);
});
