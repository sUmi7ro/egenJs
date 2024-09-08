"use strict";


//Klasser
class Rectangle{
    constructor(width, height, xpos, ypos){
        this.width = width;
        this.height = height;
        this.xpos = xpos;
        this.ypos = ypos;
    }

    //Getters
    get width() { return this._width;}
    get height() { return this._height;}
    get xpos() { return this._xpos;}
    get ypos() { return this._ypos;}

    //Setters
    set width(w){ this._width = w;}
    set height(h){ this._height = h;}
    set xpos(x){ this._xpos = x;}
    set ypos(y){ this._ypos = y;}

    //Universell funksjon
    draw(ctx, colour){
        ctx.fillStyle = colour;
        ctx.fillRect(this.xpos, this.ypos, this.width, this.height);
    }
    
}

class Stage extends Rectangle{
    constructor(width, height, xpos, ypos, colour){
        super(width, height, colour, xpos, ypos);
        this.colour = colour;

        //Stage alltid starter i (0,0)
        this.xpos = 0;
        this.ypos = 0;
    }

    get colour() { return this._colour;}
    set colour(c){ this._colour = c;}
}

class Player extends Rectangle{
    xSpeed = 0;
    ySpeed = 0;
    maxSpeed = 2;

    constructor(width, height, xpos, ypos, colour){
        super(width, height, xpos, ypos);
        this.colour = colour;
    }

    get xSpeed() { return this._xSpeed }
    get ySpeed() { return this._ySpeed }
    get maxSpeed() { return this._maxSpeed }
    get colour() { return this._colour;}

    set xSpeed(xs) { if(xs > this.maxSpeed) throw new Error("X = "+xs+" is over limit: "+this.maxSpeed); else this._xSpeed = xs;}
    set ySpeed(ys) { if(ys > this.maxSpeed) throw new Error("Y = "+ys+" is over limit: "+this.maxSpeed); else this._ySpeed = ys;}
    set maxSpeed(mxs) { if(s >= 10) throw new Error("Max speed is too high!"); else this._maxSpeed = mxs;}
    set colour(c){ this._colour = c;}

    drawPlayer(ctx){
        //Slett forrige posisjon
        player.draw(ctx, stageColour)

        //Flytt til neste posisjon
        this.xpos += this.xSpeed;
        this.ypos += this.ySpeed;
        player.draw(ctx, this.colour);
        
        console.log(this.xpos, this.ypos);  //Fjern denne
    }

    checkBorderCollison(ctx){
        let top = this.ypos < 0;
        let bottom = this.ypos+this.height+borderWidth-1 > cHeight;
        let left = this.xpos-borderWidth+1 < 0;
        let right = this.xpos+this.width+borderWidth-1 > cWidth;

        //Hvis vi treffer border 
        if(top || bottom || left || right){
            this.ySpeed = 0;
            this.xSpeed = 0;
            gameOn = false;
        }
    }
}

class Snack extends Rectangle {
    static colourArr = ["white", "rgb(221, 21, 51)"];

    constructor(width, height, xpos, ypos, colour){
        super(width, height, xpos, ypos);
        this.colour = colourArr[Math.floor(Math.random()*2)];
    }
}


//Variabler
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");
let stageColour = "#b1d908";
let cWidth = myCanvas.clientWidth;
let cHeight = myCanvas.clientHeight;
let gameOn = true;
let borderWidth = +getComputedStyle(document.getElementById("myCanvas")).borderWidth.slice(0, 1);

let stage = new Stage(cWidth, cHeight, 0, 0, stageColour);
let player = new Player(12, 12, cWidth/2, cHeight/2, "rgb(70, 70, 70)");


//Program
//Adder keylistener på piltaster.
document.addEventListener("keydown", (e) => keyListener(e));

//Setter opp bane
stage.draw(ctx, stage.colour);
player.drawPlayer(ctx);

gameLoop(); 


//Funksjoner
function gameLoop(){
    if(player.xSpeed != 0 || player.ySpeed != 0){
        player.drawPlayer(ctx);
        player.checkBorderCollison(ctx);
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