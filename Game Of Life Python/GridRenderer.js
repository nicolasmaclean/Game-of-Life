// renders the grid using HTML Canvas

// configurations
var defaultCellSize = 10;

// artifacts occur outside of these zoom ranges with html canvas
var minZoom = 10 / defaultCellSize; // this needs to be updated if defaultCellSize is changed
var maxZoom = 90 / defaultCellSize; // this needs to be updated if defaultCellSize is changed
var clr_bg = '#c0c0c0';
var fps = 10; // fps

var canvas;
var draw;

var GameofLife;
var viewer;
var userInput;

var xBounds, yBounds;
var lastFrame, fpsInterval;

function Start()
{
    // gets HTML stuff ready
    canvas = document.querySelector("#glCanvas");
    draw = canvas.getContext('2d');

    // initializes other stuffs
    viewer = new Viewer(new Vector(0, 0), 1);
    userInput = new UserInput(viewer, canvas);
    fpsInterval = 1000 / fps;
    lastFrame = Date.now();

    // initializes Cellular Automata Simulation
    GameofLife = new CellularAutomata();
    GameofLife.grid.setCell(new Vector(5, 4), true);
    GameofLife.grid.setCell(new Vector(5, 5), true);
    GameofLife.grid.setCell(new Vector(5, 6), true);

    // draw inital grid
    PreUpdate();
    PostUpdate();

    // begins update loop
    Update(true);
}

// TODO: figure out how I want it to loop or not
function Update(loop)
{
    var currentFrame = Date.now();
    elapsed = currentFrame - lastFrame;

    if (elapsed > fpsInterval)
    {
        lastFrame = currentFrame - (elapsed % fpsInterval);

        PreUpdate();
        GameofLife.step();
        PostUpdate();
    } else if (viewer.needDraw)
    {
        Draw();
        viewer.needDraw = false;
    }


    // continues update loop
    if(loop)
        window.requestAnimationFrame(Update);
}

function PreUpdate()
{
    // clears the canvas
    draw.fillStyle = clr_bg;
    draw.fillRect(0, 0, canvas.width, canvas.height);
}

function PostUpdate()
{
    DrawGrid();
    
    // TODO: separate this into a second "UI" canvas that is painted ontop of the grid canvas
    // adds border around bottom and right sides of canvas
    draw.strokeStyle = clr_bg;
    draw.moveTo(1, 1);
    draw.lineTo(1, canvas.height-1);
    draw.lineTo(canvas.width-1, canvas.height-1);
    draw.lineTo(canvas.width-1, 1);
    draw.lineTo(1, 1);
    draw.stroke();
}

// calls pre/post update drawing
function Draw()
{
    PreUpdate();
    PostUpdate();
}

function DrawGrid()
{
    // grid coords within the window bounds, inclusive
    xBounds = new Vector(Math.floor(-viewer.pos.x/viewer.cellSize), Math.floor((-viewer.pos.x+canvas.width)/viewer.cellSize));
    yBounds = new Vector(Math.floor(-viewer.pos.y/viewer.cellSize), Math.floor((-viewer.pos.y+canvas.height)/viewer.cellSize));

    for (var x = xBounds.x; x <= xBounds.y; x++)
    {
        for (var y = yBounds.x; y <= yBounds.y; y++)
        {
            // screen coords
            var cx = x*viewer.cellSize + viewer.pos.x;
            var cy = y*viewer.cellSize + viewer.pos.y;

            // draws cell
            draw.fillStyle = Cell.getColor(GameofLife.grid.getCell(new Vector(x, y)));
            DrawSquare(cx, cy, viewer.cellSize);
        }
    }
}

// draws a square at x, y with width and height of side length
function DrawSquare(x, y, side)
{
    draw.fillRect(Math.floor(x) + 1, Math.floor(y) + 1, side - 1, side - 1);
}

// stores the coord of the bottom left corner of the screen and other viewing stuff
class Viewer
{
    constructor(pos, zoom, draw)
    {
        this.pos = pos;
        this.zoom = zoom;
        this.needDraw = false;
        this.cellSize = defaultCellSize * zoom;
    }

    setZoom(z)
    {
        this.zoom = z;

        if (this.zoom < minZoom)
            this.zoom = minZoom;
        else if (this.zoom > maxZoom)
            this.zoom = maxZoom;

        this.cellSize = defaultCellSize * this.zoom;
    }

    addZoom(a)
    {
        this.setZoom(this.zoom + a);
    }
}

window.onload = Start;