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

  void updateGrid()
  {
    grid.setCell(new PVector(i, i++), true);
    grid.draw();
  }

  void updateOptimized()
  {
    grid.setCell(new PVector(i, i++), true);
    grid.drawOptimized();
  }
}
