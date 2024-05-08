const gameArea = document.getElementById("game_area");
const gameHeader = document.createElement("header");
const hangmanWordDisplay = document.createElement("p");
const currentGuess = document.createElement("p");
const previousGuesses = document.createElement("p");
const submitGuessButton = document.createElement("button");
const output = document.getElementById("output");
const instructions = document.getElementById("instructions");

gameHeader.id = "game_header";
hangmanWordDisplay.id = "hangman_word";
currentGuess.id = "current_guess";
previousGuesses.id = "previous_guesses";
submitGuessButton.id = "submit_guess_button";
submitGuessButton.textContent = "Guess Letter";

let lives = 7;
let answer;
let alreadyGuessed = "";
let current = "_ _ _ _ _ _";
let inputEnabled = false;

//index representing user's inputted letter. used as 2nd substring arg to preserve instruction part of currentGuess.textContent 
const SUBSTRING_INDEX = 16;

document.addEventListener("keydown", (e) => {
  if (!inputEnabled) {
    return;
  }
  if ("abcdefghijklmnopqrstuvwxyz".includes(e.key.toLowerCase())) {
    currentGuess.textContent = currentGuess.textContent.substring(0, SUBSTRING_INDEX) + e.key.toLowerCase();
  } 
  if (e.key == "Backspace") {
    currentGuess.textContent = currentGuess.textContent.substring(0, SUBSTRING_INDEX);
  }
})

submitGuessButton.addEventListener("click", () => {
    guessLetter(currentGuess.textContent.charAt(SUBSTRING_INDEX).toLowerCase());
})

const startGame = async (letterToEarn) => {
    answer = await generateAnswer(letterToEarn);
    gameArea.textContent = "";
    setUpDOM();
    inputEnabled = true;
}

const generateAnswer = async (letterToEarn) => {
    const file = await fetch(`./word_files/${letterToEarn.toLowerCase()}_words.txt`)
    const txt = (await file.text()).split("\n")
    return txt[Math.floor(Math.random() * txt.length)].trim();
}

const setUpDOM = () => {
    [gameHeader, hangmanWordDisplay, previousGuesses, currentGuess, submitGuessButton].forEach(node => gameArea.appendChild(node));
    gameHeader.textContent = "The World's Overlord is safeguarding the remaining letters. Take each away through a galactic game of hangman!";
    current = answer.split("").map(char => {
        return char === answer.charAt(0) ? char : "_";
    }).join(" ")
    hangmanWordDisplay.textContent = current;
    previousGuesses.textContent = "Guesses Remaining: " + lives +"\r\n";
    alreadyGuessed = answer[0] + " ";
    previousGuesses.textContent += "\nLetters guessed so far: " + alreadyGuessed;
    currentGuess.textContent = "Guess a letter: ";
}

const updateDOM = () => {
    hangmanWordDisplay.textContent = current;
    previousGuesses.textContent = "Guesses Remaining: " + lives +"\r\n";
    previousGuesses.textContent += "\nLetters guessed so far: " + alreadyGuessed;
}

const guessLetter = (guess) => {
    if (alreadyGuessed.includes(guess)) {
        //TODO: add alert user that letter was already guessed and do nothing;
        return;
    }
    let correctGuess = false;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess) {
            let newCurrent = current.split("");
            newCurrent[i * 2] = guess; //i * 2 to account for spaces btwn underscores
            current = newCurrent.join("");
            correctGuess = true;
        }
    }
    if (current.replaceAll(" ", "") === answer) {
        current = answer;
        //update output textcontent w/ earned letter
        gameWon();
        return;
    }
    if (!correctGuess) {
        lives--;
    }
    if (lives == 0) {
        gameLost();
    } else {
        alreadyGuessed += " " + guess;
        updateDOM();
    }
}

const gameWon = () => {
    //depending on letter to earn (ie: answer[0]), update output display in main js file to include the newly won letter. 
    let earnedLetter = answer[0];

    //helper function that accepts all possible indicies of letter earned, update correct index of output.textcontent to include earned letter. 
    const updateOutput = (indicies) => {
        for (let i = 0; i < indicies.length; i++) {
            if (output.textContent.charAt(indicies[i]) === "_") {
                let newOutput = output.textContent.split("");
                newOutput[indicies[i]] = earnedLetter;
                output.textContent = newOutput.join("");
                return;
            }
        }
    }
    switch(earnedLetter) {
        case "h":
            updateOutput([0]);
            break;
        case "e": 
            updateOutput([1]);
            break;
        case "l": 
            updateOutput([2, 3, 9]);
            break;
        case "o":
            updateOutput([4, 7]);
            break;
        case "w":
            updateOutput([6]);
            break;
        case "r":
            updateOutput([8]);
            break;
        case "d":
            updateOutput([10]);
            break;
        default: break;
    }
    //if all letters are earned
    if (output.textContent === "Hello World") {
        instructions.textContent = "Congratulations! You've said Hello to many Worlds! You've earned the Title, 'Intergalactic Greeter' and a metaphorical cookie.";
        gameArea.textContent = "Come back again sometime! We bake fresh metaphorical cookies daily.";
    } else {
        //TODO: create a "begin next round" button in global scope, in here make it visible. add a click handler in main.js that calls hangman(letterToEarn) and makes it disappear
    }
}
 
const gameLost = () => {
    previousGuesses.textContent = "";
    gameHeader.textContent = "Game Over! The Overlord successfully defended the letters and banished you from the world.";
    currentGuess.textContent = "The word was: " + answer;
    inputEnabled = false;
    submitGuessButton.style.display = "none";
    //TODO: add a replay button that calls a restart() function
}

export { startGame as hangman };