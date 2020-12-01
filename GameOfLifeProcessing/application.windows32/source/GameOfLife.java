import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.function.Function; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class GameOfLife extends PApplet {

CellularAutomata automata;
int w, h;
PVector backgroundColor = new PVector(192, 192, 192); // #c0c0c0 | a light gray

boolean continousStepping = true, step = false;
int stepCooldown = 300, lastStep = millis();
int frameRate = 15;

public void setup()
{
  surface.setResizable(true);
  
  frameRate(frameRate);
  
  background(backgroundColor.x, backgroundColor.y, backgroundColor.z);
  stroke(backgroundColor.x, backgroundColor.y, backgroundColor.z);

  w = width;
  h = height;
  automata = new CellularAutomata();

  if (!continousStepping)
  {
    noLoop();
  }
}

public void draw()
{
  if (continousStepping || step)
  {
    automata.step();
    step = false;
  }
  else
  {
    automata.drawGrid(); 
  }
}

public void keyPressed()
{
  boolean update = false;
  if (key == ' ' && millis() - lastStep >= stepCooldown) {
    step = true;
    update = true;
  }
  if (key == 'p') {
    automata.placePulsar(new PVector(random(automata.grid.getWidth()), random(automata.grid.getHeight())));
    update = true;
  }
  if (key == 'g') {
    automata.placeGosperGlider(new PVector(random(automata.grid.getWidth()), random(automata.grid.getHeight())));
    update = true;
  }
  if (key == 's') {
    //automata.placeGliderGun(new PVector(random(automata.grid.getWidth()), random(automata.grid.getHeight())));
    automata.placeGliderGun(new PVector(7, 2));
  }
  
  if(update)
    redraw();
  
}

// code attempting to optimize rendering
// it attempts to only update and draw changed cells each frame, but it don't work 

//if (windowResized())
  //{
  //  print("r");
  //  fill(backgroundColor.x, backgroundColor.y, backgroundColor.z);
  //  rect(0, 0, width, height);
  //  automata.updateGrid();
  //}
  //else
  //{
  //  print("!r ");
  //  automata.updateOptimized();
  //}
  
//boolean windowResized()
//{
//  boolean r = false;

//  if (w != width || h != height)
//  {
//    r = true;
//  }

//  w = width;
//  h = height;

//  return r;
//}


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

  public void step()
  {
    updateCells();
    drawGrid();
  }
  
  public void drawGrid()
  {
    grid.draw();
  }

  // cycles through every cell and updates them
  public void updateCells()
  {
    boolean[][] newGrid = new boolean[grid.getWidth()][grid.getHeight()];
    
    for(int x = 0; x < grid.grid.length; x++)
      for (int y = 0; y < grid.grid[x].length; y++)
        newGrid[x][y] = ruleBook.updatedCellValue(new PVector(x, y));
        
    grid.updateGrid(newGrid);
  }

  // an attempt at a more optimized update system.
  // updates
  public void updateOptimized()
  {
    updateCells();
    grid.drawOptimized();
  }

  
  // places a pulsar at the given position
  public void placePulsar(PVector pos)
  {
     int[][] pulsar = {{-1, 0}, {0,0}, {1,0}};
     placeCellsRelative(pulsar, pos);
  }
  
  // places a glider from game of life with the position being the bottom right cell of the glider
  public void placeGosperGlider(PVector pos)
  {
    int[][] glider = {{0,0}, {-1,0}, {-2,0}, {0,-1}, {-1,-2}};
    placeCellsRelative(glider, pos);
  }
  
  public void placeGliderGun(PVector pos)
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
  public void placeCellsRelative(int[][] positions, PVector pos)
  {
    for(int[] coord : positions)
    {
      grid.setCell(new PVector(pos.x + coord[0], pos.y + coord[1]), true);
    }
  }
}
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

  public void configure(int cellS, float gapS, PVector l, PVector d)
  {
    gapSize = gapS;
    cellSize = cellS;
    live = l;
    dead = d;
  }

  public void debug()
  {
    println("grid size: " + grid.length + "x" + grid[0].length);
    println("cell size: " + cellSize);
    println("gap size: " + gapSize);
    println("canvas size: " + width + "x" + height);
    println("live cells: " + liveCells);
  }
  
  public int getWidth()
  {
    return grid.length;
  }
  
  public int getHeight()
  {
    return grid[0].length;
  }
  
  // returns the value of the desire cell
  // returns false and prints error when given position is out of bounds
  public boolean getCell(PVector pos)
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
  public boolean setCell(PVector pos, boolean val)
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
  public void updateGrid(boolean[][] g)
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
  public int gridToCanvasCoord(float val)
  {
    return (int) (val*cellSize+gapSize);
  }

  public int cellSizeInset()
  {
    return (int) (cellSize - gapSize*2);
  }

  // draws the a blank grid
  public void draw()
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
  public void drawOptimized()
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

class RuleBook
{
  Grid grid;

  RuleBook(Grid g)
  {
    grid = g;
  }

  // checks the given cell with the rules defined in this file
  // underpopulation and overpopulation (rules 3 & 4) are taken care of by the else 
  public boolean updatedCellValue(PVector pos)
  {
    boolean currentValue = grid.getCell(pos);
    int liveNeighbors = getLiveNeighbors(pos);
    
    boolean one = GOLRuleOne(liveNeighbors, currentValue);
    boolean two = GOLRuleTwo(liveNeighbors, currentValue);
    
    if (one || two)
      return true;
    else
      return false;
  }

  // return an array of the positions of each neighbor in the grid
  public PVector[] getNeighbors(PVector pos)
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
  public int getLiveNeighbors(PVector pos)
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

// live cells survive if they have 2 or 3 live neighbors (survival)
public static boolean GOLRuleOne(int liveNeighbors, boolean currentState)
{
  return currentState && (liveNeighbors == 2 || liveNeighbors == 3); 
}

// dead cells with 3 live neighbors become alive (reproduction)
public static boolean GOLRuleTwo(int liveNeighbors, boolean currentState)
{
  return liveNeighbors == 3; 
}
  public void settings() {  size(750, 500); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "--present", "--window-color=#666666", "--stop-color=#cccccc", "GameOfLife" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
