CellularAutomata automata;
int w, h;
PVector backgroundColor = new PVector(192, 192, 192); // #c0c0c0 | a light gray

boolean continousStepping = false, step = false;
int stepCooldown = 300, lastStep = millis();

void setup()
{
  surface.setResizable(true);
  size(500, 500);
  frameRate(5);
  
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

void draw()
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

void keyPressed()
{
  if (key == ' ' && millis() - lastStep >= stepCooldown) {
    step = true;
    redraw();
  }
  if (key == 'p') {
    automata.placePulsar(new PVector(random(automata.grid.getWidth()), random(automata.grid.getHeight())));
    redraw();
  }
  if (key == 'g') {
    automata.placeGlider(new PVector(random(automata.grid.getWidth()), random(automata.grid.getHeight())));
    redraw();
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
