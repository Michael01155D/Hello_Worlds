const menu = document.getElementById("menu");
const instructions = document.getElementById("instructions");
const outputArea = document.getElementById("output_area");
const output = document.getElementById("output");
const undoButton = document.getElementById("undo_button");
const hintBox = document.getElementById("hint_box");
const gameArea = document.getElementById("game_area");
const levelInfo = document.getElementById("level_info");
const mainLayout = [menu, instructions, outputArea, hintBox, gameArea, levelInfo]

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
  if (allowInput){
    output.textContent = output.textContent.slice(0, -1);
  }
})


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
const clearLevel = () => {
  worldsCleared++
  preventInput();
  //refactor w/ world obj's event handler
  document.removeEventListener("keydown", startingWorld);
  setTimeout(() => {
    output.textContent = "Level Cleared! ...On to the next";
  }, 1000)
}


const startingWorld = (e) => {
  if (!allowInput) {
    return;
  }
  if (e.key === "Backspace"){
    output.textContent = output.textContent.slice(0, -1);
  } else if ("abcdefghijklmnopqrstuvwxyz0123456789 ".includes(e.key.toLowerCase()) && output.textContent.length < 20){
    output.textContent += e.key;
  }
  if (output.textContent.trim() === "Hello World") {
    clearLevel();
  }
}


//to be refactored into final world object's .play() function
const finalWorld = () => {
  let letters = ["H", "e", "l", "l", "o", "W", "o", "r", "l", "d"];
  let lettersToEarn = [];

  for (let i = 0; i < 5; i++) {
    let randIndex = Math.floor(Math.random() * letters.length);
    lettersToEarn.push(letters[randIndex]);
    letters.splice(randIndex, 1);
  }
  console.log("Letters are:", letters);
  console.log("to earn are:", lettersToEarn);
}