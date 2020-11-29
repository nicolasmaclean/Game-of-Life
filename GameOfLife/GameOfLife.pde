CellularAutomata automata;
int w, h;
int backgroundColor = #c0c0c0;

boolean continousStepping = false;
int stepCooldown = 300, lastStep = millis();

void setup()
{
  surface.setResizable(true);
  size(500, 500);
  fill(backgroundColor);
  rect(0, 0, width, height);

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
  if (windowResized())
  {
    print("r");
    fill(backgroundColor);
    rect(0, 0, width, height);
    automata.updateGrid();
  }
  else
  {
    print("!r");
    automata.updateOptimized();
  }
}

void keyPressed()
{
  if (key == ' ' && millis() - lastStep >= stepCooldown)
    draw();
}

boolean windowResized()
{
  boolean r = false;

  if (w != width || h != height)
  {
    r = true;
  }

  w = width;
  h = height;

  return r;
}
