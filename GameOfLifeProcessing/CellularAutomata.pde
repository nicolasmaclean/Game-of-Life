import java.util.function.Function;

class CellularAutomata
{
  Grid grid;
  RuleBook ruleBook;

  int i = 0;

  CellularAutomata()
  {
    grid = new Grid(15);
    ruleBook = new RuleBook(grid);
    grid.draw();
  }

  void step()
  {
    updateCells();
    drawGrid();
  }
  
  void drawGrid()
  {
    grid.draw();
  }

  // cycles through every cell and updates them
  void updateCells()
  {
    boolean[][] newGrid = new boolean[grid.getWidth()][grid.getHeight()];
    
    for(int x = 0; x < grid.grid.length; x++)
      for (int y = 0; y < grid.grid[x].length; y++)
        newGrid[x][y] = ruleBook.updatedCellValue(new PVector(x, y));
        
    grid.updateGrid(newGrid);
  }

  // an attempt at a more optimized update system.
  // updates
  void updateOptimized()
  {
    updateCells();
    grid.drawOptimized();
  }
 //<>//
  
  // places a pulsar at the given position
  void placePulsar(PVector pos)
  {
     int[][] pulsar = {{-1, 0}, {0,0}, {1,0}};
     placeCellsRelative(pulsar, pos);
  }
  
  // places a glider from game of life with the position being the bottom right cell of the glider
  void placeGosperGlider(PVector pos)
  {
    int[][] glider = {{0,0}, {-1,0}, {-2,0}, {0,-1}, {-1,-2}};
    placeCellsRelative(glider, pos);
  }
  
  void placeGliderGun(PVector pos)
  {
    int[][] gun = {{0,4}, {0,5}, {1,4}, {1,5},                                    // left square
      {34,2}, {34,3}, {35,2}, {35,3},                                             // right square
      {13,2}, {12,2}, {11,3}, {10,4}, {10,5}, {10,6}, {11,7}, {12,8}, {13,8},     // left half of left glider
      {14,5}, {15,3}, {16,4}, {16,5}, {16,6}, {15,7}, {17,5},                     // right half of left glider
      {20,2}, {20,3}, {20,4}, {21,2}, {21,3}, {21,4},                             // left half of right glider
      {22,1}, {22,5}, {24,0}, {24,1}, {24,5}, {24,6},                             // right half of right glider
    };
    placeCellsRelative(gun, pos);
  }
  
  // places given coordinates.
  // Input: must be an array of 2d coordinates. Each coordinate must be an array of length 2 or more
  void placeCellsRelative(int[][] positions, PVector pos)
  {
    for(int[] coord : positions)
    {
      grid.setCell(new PVector(pos.x + coord[0], pos.y + coord[1]), true);
    }
  }
}
