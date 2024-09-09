//Tenkte dette som en abstrakt klasse
//Men js lar meg ikke. Konklusjon: Js < TypeScript
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