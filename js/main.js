// Define words array
const words = [
  "Hello",
  "Code",
  "Town",
  "Youtube",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "Playing",
];

// Define difficulty levels
const levels = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Get DOM elements
const selectLevel = document.querySelector(".select");
const startButton = document.querySelector(".start");
const secondsSpan = document.querySelector(".message .seconds");
const theWord = document.querySelector(".the-word");
const upcomingWords = document.querySelector(".upcoming-words");
const input = document.querySelector(".input");
const timeLeftSpan = document.querySelector(".time span");
const scoreGot = document.querySelector(".score .got");
const scoreTotal = document.querySelector(".score .total");
const finishMessage = document.querySelector(".finish");

setValues();

// Set initial values for DOM elements
function setValues() {
  let defaultLevelName = selectLevel.value;
  let defaultLevelSeconds = levels[defaultLevelName];

  secondsSpan.textContent = defaultLevelSeconds;
  timeLeftSpan.textContent = defaultLevelSeconds;
  scoreTotal.textContent = `${words.length}`;
}

// Disable paste in input field
input.onpaste = () => false;

// Add event listener to start button
startButton.addEventListener("click", startGame);

// Function to start the game
function startGame() {
  startButton.remove();
  input.focus();
  generateWords();
  selectLevel.disabled = true;
}

// Function to generate the current and upcoming words
function generateWords() {
  // Select a random word from the array
  const randomWordIndex = Math.floor(Math.random() * words.length);
  const currentWord = words[randomWordIndex];

  // Remove the selected word from the array
  words.splice(randomWordIndex, 1);

  // Set the current word
  theWord.textContent = currentWord;

  // Generate the upcoming words list
  upcomingWords.innerHTML = words.map((word) => `<div>${word}</div>`).join("");

  // Start the game timer
  startTimer();
}

// Function to start the game timer
let counter = 0;
function startTimer() {
  const selectedLevel = selectLevel.value;
  timeLeftSpan.innerHTML =
    counter === 0 ? levels[selectedLevel] + 3 : levels[selectedLevel];
  counter++;
  const timer = setInterval(() => {
    timeLeftSpan.textContent--;
    if (timeLeftSpan.textContent === "0") {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// Function to handle the end of the game
function endGame() {
  if (theWord.textContent.toLowerCase() === input.value.toLowerCase()) {
    // If the player correctly typed the current word
    input.value = "";
    scoreGot.textContent++;
    if (words.length > 0) {
      if (words.length == 1) {
        upcomingWords.remove();
      }
      generateWords();
    } else {
      // If all words have been typed correctly
      const message = document.createElement("span");
      message.className = "good";
      message.textContent = "Congratz";
      finishMessage.appendChild(message);
    }
  } else {
    // If the player typed the wrong word
    input.disabled = true;
    const message = document.createElement("span");
    message.className = "bad";
    message.textContent = "Game Over";
    finishMessage.appendChild(message);
  }
}
selectLevel.onchange = setValues;
