import Game from "./game.min.js";

let title = "Battle";
document.title = title;
document.getElementById("gameTitle").innerHTML = title;

let game = new Game(10,35);
game.start();