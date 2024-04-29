const menu = document.getElementById("menu");
const outputArea = document.getElementById("output_area");
const output = document.getElementById("output");
const undoButton = document.getElementById("undo_button");
const hintBox = document.getElementById("hint_box");
const gameArea = document.getElementById("game_area");
const levelInfo = document.getElementById("level_info");
const mainLayout = [menu, outputArea, hintBox, gameArea, levelInfo]

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

//click handler for start buttons, switch to main view then fetch a world to start
const startGame = (difficulty) => {
    console.log("This will call a", difficulty, "world from the server!");
    //not yet implemented: currentWorld = fetchWorld(difficulty);
    startScreen.style.display = "none";
    mainLayout.map(component => component.style.visibility = "visible");
}

for (let i = 0; i < 3; i++) {
    startButtons[i].textContent = difficulties[i];
    startButtons[i].addEventListener('click', () => startGame(difficulties[i]));
}

/*
Core gameplay loop:

initialize: 
worlds_cleared = 0;
currentWorld = world fetched from starting button

while worlds_cleared < 4: 
  currentWorld.play(); 
  
  ^play function is a while loop that terminates once cleared. 
  once cleared:
  worlds_cleared++
  fetch nextWorld from server
  currentWorld = nextWorld 

  ---once worlds_cleared hits 4, fetch the final boss world
  ^could implement the final boss world locally? 
*/