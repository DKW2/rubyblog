import { Controller } from "@hotwired/stimulus"
import Cell from "../minesweeper/cell"

// Connects to data-controller="minesweeper"
export default class extends Controller {
  static targets = ["canvas", "status"];

  connect() {
    
    this.canvas = this.canvasTarget;
    this.statusDiv = this.statusTarget;
    this.context = this.canvas.getContext("2d");
    this.PLAY = "Playing";
    this.LOSE = "You Lose!";
    this.WIN = "You Win!";

    this.width = 10;
    this.height = 10;
    this.bombNum = 10;

    this.canvas.width = this.width * Cell.width;
    this.canvas.height = this.height * Cell.height;

    this.mouseHandlers();
    this.resetGame();
  }

  resetGame()
  {
    this.status = this.PLAY;
    this.statusDiv.innerHTML = this.status;
    this.currentBombCount = this.bombNum;
    this.currentTileCount = this.width * this.height - this.bombNum;
    this.initGrid();
    this.draw();
  }

  draw()
  {
    for( let x = 0; x < this.width; x++ )
      for( let y = 0; y < this.height; y++ )
        this.grid[x][y].draw();
  }

  mouseHandlers()
  {
    this.mousePressed = false;

    // Disable right click
    this.canvas.addEventListener( "contextmenu", (event) => {
      event.preventDefault();
    });

    this.canvas.addEventListener( "mousedown", this.mouseDown.bind( this ) );
  }

  disconnectMouseHandlers()
  {
    this.mousePressed = false;
    this.canvas.removeEventListener( "contextmenu", (event) => {
      event.preventDefault();
    });

    this.canvas.removeEventListener( "mousedown", this.mouseDown.bind( this ) );
  }

  initGrid()
  {
    this.createBombSet();

    this.grid = [];
    for( let x = 0; x < this.width; x++ )
    {
      this.grid[x] = [];
      for( let y = 0; y < this.height; y++ )
      {
        const isBomb = this.bombSet.has( y * this.width + x );

        // Calculate the flag val
        var val = 0;
        if( !isBomb )
          var val = this.getGridValue( x, y );

        this.grid[x][y] = new Cell( this.context, x, y, isBomb, val );
      }
    }
  }

  getCellNeighbors( x, y )
  {
    var neighbors = [];
    for( let h = -1; h <= 1; h++ )
    {
      for( let v = -1; v <= 1; v++ )
      {
        if( h == 0 && v == 0 )
          continue;
        const neighborX = x + h;
        const neighborY = y + v;
        if( neighborX >= 0 && neighborX < this.width && neighborY >= 0 && neighborY < this.height )
          neighbors.push( [neighborX, neighborY] );
      }
    }
    return neighbors;
  }

  getGridValue( x, y )
  {
    let count = 0;
    var neighbors = this.getCellNeighbors( x, y );

    for( let cell of neighbors )
      if( this.bombSet.has( cell[1] * this.width + cell[0] ) )
        count++;

    return count;
  }

  createBombSet()
  {
    this.bombSet = new Set();
    while( this.bombSet.size < this.bombNum )
      this.bombSet.add( Math.floor( Math.random() * this.width * this.height ) )
  }

  mouseDown( event )
  {
    this.mousePressed = true;
    this.clickLogic( event );
  }

  clickLogic( event )
  {
    const x = Math.floor( event.offsetX / Cell.width );
    const y = Math.floor( event.offsetY / Cell.height );
    this.toggleCell( x, y, event.buttons );
  }

  toggleCell( x, y, buttons )
  {
    const cell = this.grid[x][y];
    if( !cell.revealed && this.status == this.PLAY )
    {
      // Left click
      if( buttons === 1 && !cell.flagged )
      {
        if( cell.isBomb )
        {
          this.gameOver();
        }
        else
        {
          if( cell.val == 0 )
            this.clearEmptyCells( x, y );
          else
            this.revealCell( x, y );
          
          if( this.currentTileCount == 0 )
            this.status = this.WIN;
        }
      }

      // Right click
      if( buttons === 2 )
      {
        if( !cell.flagged )
          this.currentBombCount -= 1;
        else
          this.currentBombCount += 1;
        cell.flagged = !cell.flagged;
        cell.draw();
      }
    }
    this.statusDiv.innerHTML = this.status;
  }

  clearEmptyCells( x, y )
  {
    let cell = this.grid[x][y];
    if( !cell.revealed && !cell.isBomb && !cell.flagged )
    {
      this.revealCell( x, y );
      var neighbors = this.getCellNeighbors( x, y );
      for( let neighbor of neighbors )
      {
        this.clearEmptyCells( neighbor[0], neighbor[1] );
      }
    }
  }

  revealCell( x, y )
  {
    let cell = this.grid[x][y];
    cell.revealed = true;
    cell.draw();
    this.currentTileCount -= 1;
  }

  gameOver()
  {
    this.status = this.LOSE; 
    for( let x = 0; x < this.width; x++ )
    {
      for( let y = 0; y < this.height; y++ )
      {
        this.grid[x][y].revealed = true;
        this.grid[x][y].draw();
      }
    }
  }

  reset( event )
  {
    this.resetGame();
  }

}
