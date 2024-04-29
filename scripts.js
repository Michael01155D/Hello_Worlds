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
startScreen.textContent = "Welcome!\n\n\n" 
startScreen.textContent += "Clear the Worlds that appear before you by making the phrase 'Hello World' appear on the screen.\n\n" 
startScreen.textContent += "Sounds simple, right? Select a starting difficulty:";
