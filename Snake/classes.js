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

    checkBorderCollison(){
        let top = this.ypos < 0;
        let bottom = this.ypos+this.height+BORDERWIDTH-1 > cHeight;
        let left = this.xpos-BORDERWIDTH+1 < 0;
        let right = this.xpos+this.width+BORDERWIDTH-1 > cWidth;

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

    constructor(width, height, xMin, xMax, yMin, yMax){
        super(width, height);

        this.xpos = getRandom(xMin, xMax);
        this.ypos = getRandom(yMin, yMax);
        this.colour = Snack.colourArr[Math.floor(Math.random()*2)];
    }

    isSnackEaten(ctx, player){
        let fromBottom = player.ypos+1 < this.ypos+this.height && (player.xpos >= this.xpos || player.xpos <= this.xpos+this.width); //oiuawhdiwahdhwao
        console.log(fromBottom);
        /*
        if(true){
            //Tegn over snack

            //Increase poeng

            //Lag ny
        }
        */    
    }
}