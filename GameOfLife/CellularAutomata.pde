class CellularAutomata
{
  Grid grid;
  RuleBook ruleBook;

  int i = 0;

  CellularAutomata()
  {
    grid = new Grid();
    ruleBook = new RuleBook();
    grid.draw();
  }
  
  void drawGrid()
  {
    grid.draw();
  }

  void updateGrid()
  {
    drawGrid();
  }

  void updateOptimized()
  {
    grid.drawOptimized();
  }
  
  void placePulsar(PVector pos)
  {
     grid.setCell(new PVector(pos.x-1, pos.y), true);
     grid.setCell(new PVector(pos.x+1, pos.y), true);
     grid.setCell(new PVector(pos.x, pos.y), true);
  }
}
