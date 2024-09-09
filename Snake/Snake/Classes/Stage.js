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