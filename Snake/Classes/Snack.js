class Snack extends Rectangle {
    static colourArr = ["white", "rgb(221, 21, 51)"];

    constructor(width, height, xMin, xMax, yMin, yMax){
        super(width, height);

        this.xMin = xMin;
        this.xMax = xMax;
        this.yMin = yMin;
        this.yMax = yMax;
        this.xpos = getRandom(xMin, xMax);
        this.ypos = getRandom(yMin, yMax);
        this.colour = Snack.colourArr[Math.floor(Math.random()*2)];
    }

    isSnackEaten(ctx, player){
        let fromRight = (
            (player.ypos >= snack.ypos && player.ypos <= snack.ypos+snack.height && player.xpos-1 == snack.xpos+snack.width) ||
            (player.ypos+player.height >= snack.ypos && player.ypos+player.height <= snack.ypos+snack.height && player.xpos-1 == snack.xpos+snack.width)
        );


        let fromLeft = (
            (player.ypos >= snack.ypos && player.ypos <= snack.ypos+snack.height && player.xpos+player.width+1 == snack.xpos) ||
            (player.ypos+player.height >= snack.ypos && player.ypos+player.height <= snack.ypos+snack.height && player.xpos+player.width+1 == snack.xpos)
        );

        let fromTop = (
            (player.xpos >= snack.xpos && player.xpos <= snack.xpos+snack.width && player.ypos+player.height+1 == snack.ypos) ||
            (player.xpos+player.width >= snack.xpos && player.xpos+player.width <= snack.xpos+snack.width && player.ypos+player.height+1 == snack.ypos)
        );

        let fromBottom = (
            (player.xpos >= snack.xpos && player.xpos <= snack.xpos+snack.width && player.ypos+1 == snack.ypos+snack.height) ||
            (player.xpos+player.width >= snack.xpos && player.xpos+player.width <= snack.xpos+snack.width && player.ypos+1 == snack.ypos+snack.height)
        ); 

        console.log(fromBottom);

        if(fromRight || fromLeft || fromTop || fromBottom){
            //Tegn over snack
            snack.draw(ctx, stageColour);

            //Increase poeng

            //Lag ny
            snack = new Snack(snack.width, snack.height, snack.xMin, snack.xMax, snack.yMin, snack.yMin);

            snack.draw(ctx,snack.colour);
        }
            
    }
}