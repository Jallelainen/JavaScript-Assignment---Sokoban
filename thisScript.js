"use strict";
//------------------------------------GLOBAL FIELDS-----------------------------------
var imagePath = {
  " ": "Pics/floor.png",
  W: "Pics/wall.gif",
  B: "Pics/box.gif",
  G: "Pics/goal.gif",
  P: "Pics/player.gif",
};
var player;
var tileMap = tileMap01;
var goalCounter;
var moveCounter;
var won;
var score1 = 300;
var score2 = 400;
var score3 = 500;


//--------------------------FUNCTIONS---------------------------------------------
function reset() { //resets new game. also used to start initial game. 
  goalCounter = 0;
  moveCounter = 0;
  won = false;
  
  document.getElementById("moves").innerHTML = "<b>Your Moves: </b>" + goalCounter; //sets up a move counter at 0, actual counting handled by another function.
  document.getElementById("map").innerHTML = ""; // clears previous map.
  document.getElementById("resetButton").innerHTML = "Reset";

  for (let x = 0; x < tileMap.mapGrid.length; x++) { // for loops goes through x and y axis
    for (let y = 0; y < tileMap.mapGrid[x].length; y++) {
      let tile = document.createElement("img"); // each iteration creates an image element
      tile.id = "x" + x + "y" + y; // assign each element with an id

      let tileType = tileMap.mapGrid[x][y][0]; // gets value from SokoanBase array
      tile.src = imagePath[tileType]; //assigns appropriate image based on sokoban array value

      if (tileType == "P") {
        player = { x, y }; // assign player coordinates
      } else if (tileType == "G") {
        goalCounter++; // if goal, raise goal counter
      }

      document.getElementById("map").appendChild(tile); //implement tile in map element
    }
  }
  
  console.log(goalCounter);
}

function move(moveX, moveY) { // function for player movement, parameters based on eventlisteners
  let playerTilePlus = [ // array with relevant tiles at each index
    document.getElementById("x" + player.x + "y" + player.y), // index 0: player tile
    document.getElementById("x" + (player.x + moveX) + "y" + (player.y + moveY)), // index 1: tile next to player
    document.getElementById("x" + (player.x + moveX + moveX) + "y" + (player.y + moveY + moveY)), // index 2: two tiles away from player
  ];

  let tileTypes = [playerTilePlus[0].src, playerTilePlus[1].src, playerTilePlus[2].src]; // gets what type each tile is at specified index
  let moveIsOk = false;

  if ( tileTypes[1].endsWith(imagePath["G"]) || tileTypes[1].endsWith(imagePath[" "]) ) // move is allowed if tile next to player is floor or goal
    moveIsOk = true;
  else if ( tileTypes[1].endsWith(imagePath["B"]) && (tileTypes[2].endsWith(imagePath[" "]) || tileTypes[2].endsWith(imagePath["G"]))) { // move is allowed if tile next to player is box AND tile after that is goal or floor
    moveIsOk = true;

    if (tileTypes[2].endsWith(imagePath["G"])) // if box ends up on goal, reduce goal counter
      goalCounter--;
    if (tileMap.mapGrid[player.x + moveX][player.y + moveY][0] == "G") // if box is moved away from goal position, increase goal counter
      goalCounter++;
      playerTilePlus[2].src = imagePath["B"]; //moves box along with player
  }

  if (moveIsOk == true && won != true) { // if move is allowed and won state not met
    playerTilePlus[0].src = tileMap.mapGrid[player.x][player.y][0] === "G"
        ? imagePath["G"] : imagePath[" "]; // checks SokobanBase map what tiletype is att player position and inserts that tile there
    playerTilePlus[1].src = imagePath["P"]; // inserts player tile at index 1
    player.y += moveY;
    player.x += moveX; // assigns player with new coordinates
  }
}

function moveCount() { // adds a move counter
    moveCounter++;
    document.getElementById("moves").innerHTML = "<b>Your Moves: </b>" + moveCounter; 
}

function winning() { // when winning conditions are met
    alert("Congratulations! You've Won! Your score: " + moveCounter);
    highscore(moveCounter);
    won = true; // prevents player from further movement
}

function highscore(highscore) {
    let name;
    let keepAlive = true;

    if ( highscore < score1 ){
        score1 = highscore;
        while( keepAlive == true ){
            name = prompt("You got a highscore! Please enter a name with 3 symbols.");
            if (name.length == 3){
                document.getElementById("sc1").innerHTML = name.bold + " " + score1 + " moves";
                keepAlive = false;
            }
        }
        
    }else if ( highscore < score2){
        score2 = highscore;
        while( keepAlive == true ){
            name = prompt("You got a highscore! Please enter a name with 3 symbols.");
            if (name.length == 3){
                document.getElementById("sc2").innerHTML = name.bold + " " + score2 + " moves";
                keepAlive = false;
            }
        }
    }else if ( highscore < score3){
        score3 = highscore;
        while( keepAlive == true ){
            name = prompt("You got a highscore! Please enter a name with 3 symbols.");
            if (name.length == 3){
                document.getElementById("sc3").innerHTML = name.bold + " " + score3 + " moves";
                keepAlive = false;
            }
        }
    }
}


//--------------------------------EVENT LISTENERS-----------------------------------------------
window.addEventListener("keydown", function (event) { //listens to if arrow keys are pressed and
    if (event.key == "ArrowUp" && won != true){ move(-1, 0); moveCount(); }
    else if (event.key == "ArrowLeft" && won != true){ move(0, -1); moveCount(); }
    else if (event.key == "ArrowDown" && won != true){ move(1, 0); moveCount(); }
    else if (event.key == "ArrowRight" && won != true){ move(0, 1); moveCount(); }
    event.preventDefault(); } ); //prevents default function of arrowkeys (aka move page up/down etc)
  

window.addEventListener("keyup", function () {if (goalCounter === 0) winning();} ); // checks if won state is met after move is done