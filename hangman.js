const gameArea = document.getElementById("game_area");
const gameHeader = document.createElement("header");
const hangmanWordDisplay = document.createElement("p");
const currentGuess = document.createElement("p");
const previousGuesses = document.createElement("p");
const submitGuessButton = document.createElement("button");

gameHeader.id = "game_header";
hangmanWordDisplay.id = "hangman_word";
currentGuess.id = "current_guess";
previousGuesses.id = "previous_guesses";
submitGuessButton.id = "submit_guess_button";
submitGuessButton.textContent = "Guess Word";

let lives = 6;
let answer;
let alreadyGuessed = "";
let current = "______";
let inputEnabled = false;

document.addEventListener("keydown", (e) => {
  if (!inputEnabled) {
    return;
  }
  if ("abcdefghijklmnopqrstuvwxyz".includes(e.key.toLowerCase())) {
    currentGuess.textContent = e.key;
  } 
  if (e.key == "Backspace") {
    currentGuess.textContent = "";
  }
})

submitGuessButton.addEventListener("click", () => {
    guessLetter(currentGuess.textContent.toLowerCase());
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
    return txt[Math.floor(Math.random() * txt.length)];
}

const setUpDOM = () => {
    [gameHeader, hangmanWordDisplay, currentGuess, previousGuesses, submitGuessButton].forEach(node => gameArea.appendChild(node));
    gameHeader.textContent = "The World's Overlord is safeguarding the remaining letters. Take each away through a galactic game of hangman!";
    previousGuesses.textContent = "Guesses Remaining: " + lives +"\n";
    currentGuess.textContent = "";
}

const updateDOM = () => {
    hangmanWordDisplay.textContent = current;
    previousGuesses.textContent = "Guesses Remaining: " + lives + "\n";
    previousGuesses.textContent += "Letters guessed so far: " + alreadyGuessed;
}

const guessLetter = (guess) => {
    if (alreadyGuessed.includes(guess)) {
        //alert user that letter was already guessed and do nothing;
        return;
    }
    let correctGuess = false;
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess) {
            let newCurrent = current.split("");
            newCurrent[i] = guess;
            current = newCurrent.join("");
            correctGuess = true;
        }
    }
    //CURRENT BUG: need to get proper string equality once word is found
    console.log("after guess, current is: " + current)
    console.log("and answer is: " + answer);
    console.log("current === answer ?",  current === answer);
    if (current === answer) {
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

    //helper function for cases when letter earned appears more than once in Hello World
    const updateOutput = (indicies) => {
        for (let i = 0; i < indicies.length; i++) {
            if (output.textContent.charAt(indicies[i]) === "_") {
                output.textContent.charAt(indicies[i]) = earnedLetter;
                return;
            }
        }
    }
    switch(earnedLetter) {
        case "h":
            output.textContent.charAt(0) = "H";
            break;
        case "e": 
            output.textContent.charAt(1) = "e";
            break;
        case "l": 
            updateOutput([2, 3, 9])
            break;
        case "o":
            updateOutput([4, 7])
            break;
        case "w":
            output.textContent.charAt(6) = "W";
            break;
        case "r":
            output.textContent.charAt(8) = "r";
            break;
        case "d":
            outerput.textContent.charAt(10) = "d";
            break;
        default: break;
    }
}
 
const gameLost = () => {
    gameArea.textContent = "Game Over! The Overlord successfully defended the letters and banished you from the world.";
    inputEnabled = false;
    //TODO: add a replay button
}

export { startGame as hangman };