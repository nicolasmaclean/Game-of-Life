class Grid
{
  // configurations
  int cellSize;
  float gapSize;
  PVector offset;
  PVector live, dead; // cell colors

  // class logic
  boolean[][] grid;
  ArrayList<PVector> changedCells;
  int liveCells = 0;

  // default constructor
  Grid()
  {
    this(15);
  }

  // constructs grid given desired cell size
  Grid(int size)
  {
    this(size, width/size, height/size);
  }

  // constructs grid given desired cell amount
  Grid(int horizontalCells, int verticalCells)
  {
    this(min(width/horizontalCells, height/verticalCells));
  }

  // constructs grid given desired values
  Grid(int size, int horizontalCells, int verticalCells)
  {
    configure(size, 1, new PVector(0, 0, 0), new PVector(255, 255, 255));

    grid = new boolean[horizontalCells][verticalCells];
    changedCells = new ArrayList<PVector>();

    if (grid.length == 0 || grid[0].length == 0)
      print("there are no cells in the grid");
    else
      offset = new PVector((width - grid.length*cellSize)/2, (height - grid[0].length*cellSize)/2);

    debug();
  }

  void configure(int cellS, float gapS, PVector l, PVector d)
  {
    gapSize = gapS;
    cellSize = cellS;
    live = l;
    dead = d;
  }

  void debug()
  {
    println("grid size: " + grid.length + "x" + grid[0].length);
    println("cell size: " + cellSize);
    println("gap size: " + gapSize);
    println("canvas size: " + width + "x" + height);
    println("live cells: " + liveCells);
  }
  
  int getWidth()
  {
    return grid.length;
  }
  
  int getHeight()
  {
    return grid[0].length;
  }
  
  // returns the value of the desire cell
  // returns false and prints error when given position is out of bounds
  boolean getCell(PVector pos)
  {
    if (pos.x >= getWidth() || pos.x < 0) {
      //println ("getCell: pos.x out of bounds. pos.x = " + (int)pos.x + " and grid width = " +  getWidth());
      return false;
    }
    else if (pos.y >= getHeight() || pos.y < 0) {
      //println ("getCell: pos.y out of bounds. pos.y = " + (int)pos.y + " and grid height = " +  getHeight());
      return false;
    } 
    else
    {
      return grid[(int)pos.x][(int)pos.y];
    }
  }

  // sets a cell to the given value and returns if the cell was able to be placed
  // skips values that are out of bounds and prints a note
  boolean setCell(PVector pos, boolean val)
  {
    if (pos.x >= getWidth()) {
      println ("setCell: pos.x out of bounds. pos.x = " + (int)pos.x + " and grid width = " +  getWidth());
      return false;
    }
    else if (pos.y >= getHeight()) {
      println ("setCell: pos.y out of bounds. pos.y = " + (int)pos.y + " and grid height = " +  getHeight());
      return false;
    } 
    else
    {
      grid[(int)pos.x][(int)pos.y] = val;
      changedCells.add(pos);
      liveCells++;
      return true;
    }
  }
  
  // replaces the current grid with the given grid
  void updateGrid(boolean[][] g)
  {
    if(g.length != getWidth() || g[0].length != getHeight())
    {
      println("updateGrid: new grid is a different size than the current grid");
      grid = g;
      
    }
    else
    {
      grid = g; 
    }
  }

  // converts grid coordinate to canvas coordinate. Also adds offset to center grid on canvas.
  int gridToCanvasCoord(float val)
  {
    return (int) (val*cellSize+gapSize);
  }

  int cellSizeInset()
  {
    return (int) (cellSize - gapSize*2);
  }

  // draws the a blank grid
  void draw()
  {
    int actualWidth = cellSizeInset();

    for (int x = 0; x < grid.length; x++) 
    {
      for (int y = 0; y < grid[x].length; y++)
      {
        if (grid[x][y])
          fill(live.x, live.y, live.z);
        else
          fill(dead.x, dead.y, dead.z);

        rect(gridToCanvasCoord(x) + offset.x, gridToCanvasCoord(y) + offset.y, actualWidth, actualWidth);
      }
    }
  }

  // draws any changed cells with the appropriate colors
  void drawOptimized()
  {
    int actualWidth = cellSizeInset();

    for (PVector cell : changedCells)
    {
      if (grid[(int)cell.x][(int)cell.y])
        fill(live.x, live.y, live.z);
      else
        fill(dead.x, dead.y, dead.z);

      rect(gridToCanvasCoord(cell.x) + offset.x, gridToCanvasCoord(cell.y) + offset.y, actualWidth, actualWidth);
    }
    
    changedCells = new ArrayList<PVector>(); 
  }
}
