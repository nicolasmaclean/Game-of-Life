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
     grid.setCell(new PVector(pos.x-1, pos.y), true);
     grid.setCell(new PVector(pos.x+1, pos.y), true);
     grid.setCell(new PVector(pos.x, pos.y), true);
  }
  
  // places a glider from game of life with the position being the bottom right cell of the glider
  void placeGlider(PVector pos)
  {
    grid.setCell(new PVector(pos.x, pos.y), true);
    grid.setCell(new PVector(pos.x-1, pos.y), true);
    grid.setCell(new PVector(pos.x-2, pos.y), true);
    grid.setCell(new PVector(pos.x, pos.y-1), true);
    grid.setCell(new PVector(pos.x-1, pos.y-2), true);
  }
}
