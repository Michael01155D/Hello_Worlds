import { hangman }  from "./hangman.js";


//temp for debugging:
hangman('w');

const menu = document.getElementById("menu");
const instructions = document.getElementById("instructions");
const outputArea = document.getElementById("output_area");
const output = document.getElementById("output");
const undoButton = document.getElementById("undo_button");
const hintBox = document.getElementById("hint_box");
const gameArea = document.getElementById("game_area");
const levelInfo = document.getElementById("level_info");
const mainLayout = [menu, instructions, outputArea, hintBox, gameArea, levelInfo]

//for worlds that give some letters to the player: 
const LETTERS = ["H", "e", "l", "l", "o", "W", "o", "r", "l", "d"];
let lettersToEarn = [];

//hide main view until start screen is finished
mainLayout.map(component => component.style.visibility = "hidden");

const startScreen = document.createElement("section")
startScreen.id = "start_screen";
document.getElementsByTagName("main")[0].insertBefore(startScreen, menu);
const introMsg = document.createElement("p");
startScreen.appendChild(introMsg);
introMsg.textContent = "Welcome!\n\n\n" 
introMsg.textContent += "Clear the Worlds that appear before you by making the phrase 'Hello World' appear on the screen.\n\n" 
introMsg.textContent += "Sounds simple... right? Select a starting difficulty:";
const easyButton = document.createElement("button");
const mediumButton = document.createElement("button");
const hardButton = document.createElement("button");
const startButtons = [easyButton, mediumButton, hardButton];
startButtons.map(button => startScreen.appendChild(button));
const difficulties = ["Easy", "Medium", "Hard"];

//boolean flag to allow keyboard input
let inputEnabled = false;

//button for advancing to next world
const advanceButton = document.createElement("button");
advanceButton.style.display = "none";
advanceButton.textContent = "Advance To Next World";
advanceButton.id = "advance_button";
outputArea.appendChild(advanceButton);

const preventInput = () => {
  inputEnabled = false;
  undoButton.style.visibility = "hidden";
}

const allowInput = () => {
  inputEnabled = true;
  undoButton.style.visibility = "visible";
}

preventInput();

//click handler for start buttons, switch to main view then fetch a world to start
const startGame = (difficulty) => {
    console.log("This will call a", difficulty, "world object from the server!");
    //not yet implemented: currentWorld = fetchWorld(difficulty);
    startScreen.style.display = "none";
    mainLayout.map(component => component.style.visibility = "visible");
    allowInput();
}

undoButton.addEventListener('click', (e) => {
  if (inputEnabled){
    output.textContent = output.textContent.slice(0, -1);
  }
})

//assign a difficulty to each start button
for (let i = 0; i < 3; i++) {
    startButtons[i].textContent = difficulties[i];
    startButtons[i].id = startButtons[i].textContent.toLowerCase() + "_button";
    startButtons[i].addEventListener('click', () => startGame(difficulties[i]));
}

let worldsCleared = 0;
let currentWorld = "this will be replaced by a world object";

//once worlds are refactored into objects, each obj will have its own listener fnctn
document.addEventListener("keydown", (e) => startingWorld(e))

//refactor by passing world obj as arg
const clearLevel = (activeListener) => {
  worldsCleared++
  preventInput();
  //refactor w/ world obj's event handler
  document.removeEventListener("keydown", activeListener);
  setTimeout(() => {
    output.textContent = "Level Cleared! ...On to the next";
    advanceButton.style.display = "";
  }, 500);
}


const startingWorld = (e) => {
  if (!inputEnabled) {
    return;
  }
  if (e.key === "Backspace"){
    output.textContent = output.textContent.slice(0, -1);
  } else if ("abcdefghijklmnopqrstuvwxyz0123456789 ".includes(e.key.toLowerCase()) && output.textContent.length < 20){
    output.textContent += e.key;
  }
  if (output.textContent.trim() === "Hello World") {
    clearLevel(startingWorld);
    //post-refactor, this should be done when worldsCleared == 4;
  }
}


const setUpFinalWorld = () => {
  output.textContent = "";
  let lettersGiven = Array.from(LETTERS);
  //boolean to add a space after the first letter o appears in Hello World;
  let firstO = true;
  //randomly choose 7 letters to give to the player, the other 3 must be earned
  for (let i = 0; i < 3; i++) {
    let randIndex = Math.floor(Math.random() * lettersGiven.length);
    lettersToEarn.push(lettersGiven[randIndex]);
    lettersGiven.splice(randIndex, 1);
  }
//add letters given to player to output box:
  LETTERS.forEach(letter => {
    if (lettersGiven.includes(letter)){
      output.textContent += letter;
      lettersGiven.splice(lettersGiven.indexOf(letter), 1);
    } else {
      output.textContent += "_";
    }
    if (letter === "o" && firstO) {
      output.textContent += " ";
      firstO = false;
    }});
    advanceButton.style.display = "none";
    gameArea.textContent = "**TODO**: implement logic where the remaining letters must be earned"
    gameArea.textContent += "through 'hangman' style game played in this box"
    gameArea.style.fontSize = "1.5rem";
    hangman(lettersToEarn[0]);
}

advanceButton.addEventListener("click", () => setUpFinalWorld());

//to be refactored into final world object
const finalWorld = (e) => {
  if (!allowInput) {
    return;
  }
  //for each letter to earn, play a game of hangman! 
}

//document.addEventListener("keydown", (e) => finalWorld(e));