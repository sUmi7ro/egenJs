"use strict";

//Variabler
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");
let txtScore = document.getElementById("score");
let txtHScore = document.getElementById("hScore");
let stageColour = "#b1d908";
let cWidth = myCanvas.clientWidth;
let cHeight = myCanvas.clientHeight;
let gameOn = true;

const BLOCK = 12;
const BORDERWIDTH = +getComputedStyle(myCanvas).borderWidth.slice(0, 1);

//Grense for hvor snacks kan spawne.
let xMin = BORDERWIDTH*2;
let xMax = cWidth-xMin-BLOCK;
let yMin = BORDERWIDTH*2;
let yMax = cHeight-yMin-BLOCK;

let stage = new Stage(cWidth, cHeight, 0, 0, stageColour);
let player = new Player(BLOCK, BLOCK, cWidth/2, cHeight/2, "rgb(70, 70, 70)");
let snack = new Snack(BLOCK, BLOCK, xMin, xMax, yMin, yMax);

//Program
//Adder keylistener på piltaster.
document.addEventListener("keydown", (e) => keyListener(e));

//Setter opp bane
stage.draw(ctx, stage.colour);
player.drawPlayer(ctx);
snack.draw(ctx, snack.colour);
if(localStorage.hScore == null){
    localStorage.hScore = 0;
}

gameLoop(); 


//Funksjoner
function gameLoop(){
    
    if(localStorage.hScore < player.score) localStorage.hScore = player.score;
    txtHScore.innerHTML = `High Score: ${localStorage.hScore}`;

    if(player.xSpeed != 0 || player.ySpeed != 0){
        player.drawPlayer(ctx);
        player.checkBorderCollison();
        snack.isSnackEaten(ctx, player);
        txtScore.innerHTML = `Score: ${player.score}`;
    }

    if(gameOn){
        requestAnimationFrame(gameLoop);
    }
}

function keyListener(e){

    if(e.code == "ArrowRight") { player.xSpeed = player.maxSpeed; player.ySpeed = 0; }
    if(e.code == "ArrowLeft") { player.xSpeed = -player.maxSpeed; player.ySpeed = 0; }
    if(e.code == "ArrowUp") { player.xSpeed = 0; player.ySpeed = -player.maxSpeed; }
    if(e.code == "ArrowDown") { player.xSpeed = 0; player.ySpeed = player.maxSpeed; }

    //Hvis vi treffer en border så kanb vi ikke fortsette ved å gå mot grensen
    player.checkBorderCollison(ctx);
}

function getRandom(max, min){
    return Math.floor(Math.random() * (max - min) + min);
}