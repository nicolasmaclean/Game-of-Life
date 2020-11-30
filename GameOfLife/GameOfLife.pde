CellularAutomata automata;
int w, h;
PVector backgroundColor = new PVector(192, 192, 192); // #c0c0c0 | a light gray

boolean continousStepping = true;
int stepCooldown = 300, lastStep = millis();

void setup()
{
  surface.setResizable(true);
  size(500, 500);
  frameRate(5);
  
  background(backgroundColor.x, backgroundColor.y, backgroundColor.z);
  stroke(backgroundColor.x, backgroundColor.y, backgroundColor.z);
  //fill(backgroundColor.x, backgroundColor.y, backgroundColor.z);
  //rect(0, 0, width, height);

  w = width;
  h = height;
  automata = new CellularAutomata();
  addRules();

  if (!continousStepping)
  {
    noLoop();
  }
}

void draw()
{
  automata.updateGrid();
}

void addRules()
{
  RuleBook.addRule();
}

boolean placed = false;

void keyPressed()
{
  if (key == ' ' && millis() - lastStep >= stepCooldown) {
    redraw();
  }
  if (key == 'p' && !placed) {
    automata.placePulsar(new PVector(automata.grid.grid.length/2, automata.grid.grid[0].length/2));
    placed = true;
  }
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
