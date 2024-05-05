const gameArea = document.getElementById("game_area");
const gameHeader = document.createElement("header");
const hangmanWordDisplay = document.createElement("p");
const previousGuesses = document.createElement("p");
gameHeader.id = "game_header";
hangmanWordDisplay.id = "hangman_word";
previousGuesses.id = "previous_guesses";



let lives = 6;
let answer;
let guessed = "";
let current = "_ _ _ _ _ _";


const startGame = async (letter) => {
    answer = await generateAnswer(letter);
    gameArea.textContent = "";
    updateDOM();
}

const generateAnswer = async (letter) => {
    const file = await fetch(`./word_files/${letter.toLowerCase()}_words.txt`)
    const txt = (await file.text()).split("\n")
    return txt[Math.floor(Math.random() * txt.length)];
}

const updateDOM = () => {
    [gameHeader, hangmanWordDisplay, previousGuesses].forEach(node => gameArea.appendChild(node));
    gameHeader.textContent = "The World's Overlord is safeguarding the remaining letters. Take each away through a galactic game of hangman!"

}

export { startGame as hangman };