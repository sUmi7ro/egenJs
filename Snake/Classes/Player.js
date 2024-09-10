class Player extends Rectangle{
    xSpeed = 0;
    ySpeed = 0;
    maxSpeed = 1;
    score = 0;

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