const gameArea = document.getElementById("game_area");
const gameHeader = document.createElement("header");
const hangmanWordDisplay = document.createElement("p");
const currentGuess = document.createElement("p");
const previousGuesses = document.createElement("p");


gameHeader.id = "game_header";
hangmanWordDisplay.id = "hangman_word";
currentGuess.id = "current_guess";
previousGuesses.id = "previous_guesses";

let lives = 6;
let answer;
let guessed = "";
let current = "_ _ _ _ _ _";


currentGuess.addEventListener("keydown", (e) => {
  if ("abcdefghijklmnopqrstuvwxyz".includes(e.key.toLowerCase())) {
    currentGuess.textContent += e.key;
    console.log("reached for some reason")
  } 
  if (e.key == "Backspace") {
    currentGuess.textContent = currentGuess.textContent.splice(currentGuess.length, 1);
  }
})

const startGame = async (letter) => {
    answer = await generateAnswer(letter);
    gameArea.textContent = "";
    setUpDOM();
}

const generateAnswer = async (letter) => {
    const file = await fetch(`./word_files/${letter.toLowerCase()}_words.txt`)
    const txt = (await file.text()).split("\n")
    return txt[Math.floor(Math.random() * txt.length)];
}

const setUpDOM = () => {
    [gameHeader, hangmanWordDisplay, currentGuess, previousGuesses].forEach(node => gameArea.appendChild(node));
    gameHeader.textContent = "The World's Overlord is safeguarding the remaining letters. Take each away through a galactic game of hangman!";
    previousGuesses.textContent = "Guesses Remaining: " + lives +"\n";
}

const updateDOM = () => {
    hangmanWordDisplay.textContent = current;
    previousGuesses.textContent += "Letters guessed so far: " + guessed;
}

export { startGame as hangman };