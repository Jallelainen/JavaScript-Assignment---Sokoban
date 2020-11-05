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
var score1;
var score2;
var score3;


//--------------------------FUNCTIONS---------------------------------------------
function reset() { 
  let map = document.getElementById("map");
  goalCounter = 0;
  moveCounter = 0;
  won = false;
  
  document.getElementById("moves").innerHTML = "<b>Your Moves: </b>" + goalCounter;
  document.getElementById("map").innerHTML = "";
  document.getElementById("resetButton").innerHTML = "Reset";

  for (let x = 0; x < tileMap.mapGrid.length; x++) {
    for (let y = 0; y < tileMap.mapGrid[x].length; y++) {
      let tile = document.createElement("img");
      tile.id = "x" + x + "y" + y;

      let tileType = tileMap.mapGrid[x][y][0];
      tile.src = imagePath[tileType];

      if (tileType == "P") {
        player = { x, y };
      } else if (tileType == "G") {
        goalCounter++;
      }

      map.appendChild(tile);
    }
  }
  
  console.log(goalCounter);
}

function move(moveX, moveY) { 
  let playerTilePlus = [
    document.getElementById("x" + player.x + "y" + player.y),
    document.getElementById("x" + (player.x + moveX) + "y" + (player.y + moveY)),
    document.getElementById("x" + (player.x + moveX + moveX) + "y" + (player.y + moveY + moveY)),
  ];

  let tileTypes = [playerTilePlus[0].src, playerTilePlus[1].src, playerTilePlus[2].src];
  let moveIsOk = false;

  if ( tileTypes[1].endsWith(imagePath["G"]) || tileTypes[1].endsWith(imagePath[" "]) )
    moveIsOk = true;
  else if ( tileTypes[1].endsWith(imagePath["B"]) && (tileTypes[2].endsWith(imagePath[" "]) || tileTypes[2].endsWith(imagePath["G"]))) {
    moveIsOk = true;

    if (tileTypes[2].endsWith(imagePath["G"]))
      goalCounter--;
    if (tileMap.mapGrid[player.x + moveX][player.y + moveY][0] == "G")
      goalCounter++;
      playerTilePlus[2].src = imagePath["B"];
  }

  if (moveIsOk == true && won != true) {
    playerTilePlus[0].src = tileMap.mapGrid[player.x][player.y][0] === "G"
        ? imagePath["G"]
        : imagePath[" "];
    playerTilePlus[1].src = imagePath["P"];
    player.y += moveY;
    player.x += moveX;
  }
}

function moveCount() {
    moveCounter++;
    document.getElementById("moves").innerHTML = "<b>Your Moves: </b>" + moveCounter;
}

function winning() {
    highscore(moveCounter);
    alert("Congratulations! You've Won! Your score: " + moveCounter);
    won = true;
}

function highscore(highscore) {
    let name;
    let keepAlive = true;

    if ( highscore < score1 ){
        score1 = highscore;
        while( keepAlive == true ){
            name = prompt("You got a highscore! Please enter a name with 3 symbols.");
            if (name.length == 3){
                document.getElementById("sc1").innerHTML = name + " " + score1 + " moves";
                keepAlive = false;
            }
        }
        
    }else if ( highscore < score2){
        score2 = highscore;
        while( keepAlive == true ){
            name = prompt("You got a highscore! Please enter a name with 3 symbols.");
            if (name.length == 3){
                document.getElementById("sc2").innerHTML = name + " " + score2 + " moves";
                keepAlive = false;
            }
        }
    }else if ( highscore < score3){
        score3 = highscore;
        while( keepAlive == true ){
            name = prompt("You got a highscore! Please enter a name with 3 symbols.");
            if (name.length == 3){
                document.getElementById("sc3").innerHTML = name + " " + score3 + " moves";
                keepAlive = false;
            }
        }
    }
}


//--------------------------------EVENT LISTENERS-----------------------------------------------
window.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp" && won != true){ move(-1, 0); moveCount(); }
    else if (event.key == "ArrowLeft" && won != true){ move(0, -1); moveCount(); }
    else if (event.key == "ArrowDown" && won != true){ move(1, 0); moveCount(); }
    else if (event.key == "ArrowRight" && won != true){ move(0, 1); moveCount(); }
    event.preventDefault(); //Cancel default action (aka move page up/down etc)
  }, true);

window.addEventListener("keyup", function () {if (goalCounter === 0) winning();} );