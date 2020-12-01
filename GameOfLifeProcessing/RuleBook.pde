class RuleBook
{
  Grid grid;

  RuleBook(Grid g)
  {
    grid = g;
  }

  // checks the given cell with the rules defined in this file
  // underpopulation and overpopulation (rules 3 & 4) are taken care of by the else 
  boolean updatedCellValue(PVector pos)
  {
    boolean currentValue = grid.getCell(pos);
    int liveNeighbors = getLiveNeighbors(pos);
    
    return GOL(liveNeighbors, currentValue);
  }

  // return an array of the positions of each neighbor in the grid
  PVector[] getNeighbors(PVector pos)
  {
    PVector[] neighbors = new PVector[8];
    int i = 0;

    for (int x = -1; x <= 1; x++)
      for (int y = -1; y <= 1; y++)
        if (x != 0 && y != 0)
          neighbors[i++] = new PVector(x, y);

    return neighbors;
  }

  // returns how many neighbors are alive
  int getLiveNeighbors(PVector pos)
  {
    int count = 0;

    for (int x = -1; x <= 1; x++)
      for (int y = -1; y <= 1; y++)
        if (x != 0 || y != 0)
          if (grid.getCell(new PVector(pos.x + x, pos.y + y)))
            count++;
            
    return count;
  }
}

// Conway's Game of Life rules in one little statement
// overpopulation and underpopulation kill, reproduction with 3 neighbors, and 
static boolean GOL(int liveNeighbors, boolean currentState)
{
  return currentState & (liveNeighbors == 2) | (liveNeighbors == 3); 
}
