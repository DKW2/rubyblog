export default class Cell {
    static width = 20;
    static height = 20;
    static bombColor = "#E23535";
    static hiddenColor = "#E4E1E0";
    static revealColor = "#FFFFFF";
    
    constructor( context, gridX, gridY, isBomb, val )
    {
        this.context = context;

        this.gridX = gridX;
        this.gridY = gridY;
        this.isBomb = isBomb;
        this.revealed = false;
        this.flagged = false;
        this.val = val;
    }

    draw()
    {
        // Get the context so we don't keep calling this.context
        const ctx = this.context;

        // Create the main square
        ctx.fillStyle = this.revealed ? ( this.isBomb ? Cell.bombColor : Cell.revealColor ) : Cell.hiddenColor;
        ctx.fillRect(
            this.gridX * Cell.width,
            this.gridY * Cell.height,
            Cell.width,
            Cell.height
        );
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.4;
        ctx.strokeRect(
            this.gridX * Cell.width,
            this.gridY * Cell.height,
            Cell.width,
            Cell.height
        );

        // Create the revealed tile
        if( this.revealed && this.val != 0 )
        {
            ctx.fillStyle = "#000000";
            ctx.fillText( this.val, (this.gridX + 0.35 ) * Cell.width, (this.gridY + 0.6 ) * Cell.height )
        }

        // Create the flagged tile
        else if( !this.revealed && this.flagged )
        {
            this.context.fillStyle = "#FFDB58";
            
            ctx.beginPath();
            ctx.moveTo( (this.gridX + 0.8) * Cell.width, (this.gridY + 0.5) * Cell.height );
            ctx.lineTo( (this.gridX + 0.2) * Cell.width, (this.gridY + 0.1) * Cell.height );
            ctx.lineTo( (this.gridX + 0.2) * Cell.width, (this.gridY + 0.9) * Cell.height );
            ctx.fill();
            ctx.fillStyle = "#000000";
            ctx.stroke();
        }
    }
}