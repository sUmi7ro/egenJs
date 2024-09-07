"use strict";


//Klasser
class Bane{
    constructor(width, height, colour){
        this.width = width;
        this.height = height;
        this.colour = colour;
    }

    createLevel(ctx){
        ctx.fillStyle = this.colour;
        ctx.fillRect(0, 0, this.width, this.height);
    }
}

//Variabler
let myCanvas = document.getElementById("myCanvas");
let ctx = myCanvas.getContext("2d");
let cWidth = myCanvas.clientWidth;
let cHeight = myCanvas.clientHeight;

let bane = new Bane(cWidth, cHeight, "#b1d908");

//let bane = new Bane(myCanvas.clientWidth, myCanvas.clientHeight);

//Program
bane.createLevel(ctx);

ctx.fillStyle = "Black";
ctx.fillRect((cWidth/2), (cHeight/2), 12, 12);

//Funksjoner