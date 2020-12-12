// renders the grid using HTML Canvas

var canvas;
var draw;

var GameofLife;
var viewer;

const defaultCellSize = 10;
const minZoom = 1 / defaultCellSize;

const clr_dead = 'white';
const clr_live = 'black';
const clr_bg = '#c0c0c0';

var xBounds, yBounds;

function Start()
{
    // gets HTML stuff ready
    canvas = document.querySelector("#glCanvas");
    draw = canvas.getContext('2d');

    // initializes viewer
    viewer = new Viewer(new Vector(0, 0), 1);

    // initializes Cellular Automata Simulation
    GameofLife = new CellularAutomata();
    GameofLife.grid.setCell(new Vector(1, 1), true);
    DrawGrid();

    // begins update loop
    Update();
}

function Update()
{
    // clears the canvas
    draw.fillStyle = clr_bg;
    draw.fillRect(0, 0, canvas.width, canvas.height);
    
    // updates/draws the simulation
    GameofLife.step();
    DrawGrid();
    
    // adds border around bottom and right sides of canvas
    draw.strokeStyle = clr_bg;
    draw.moveTo(1, 1);
    draw.lineTo(1, canvas.height-1);
    draw.lineTo(canvas.width-1, canvas.height-1);
    draw.lineTo(canvas.width-1, 1);
    draw.lineTo(1, 1);
    draw.stroke();

    // continues update loop
    window.requestAnimationFrame(Update);
}

function DrawGrid()
{
    // grid coords in the window bounds, inclusive
    xBounds = new Vector(Math.floor(-viewer.pos.x/viewer.cellSize), Math.floor((-viewer.pos.x+canvas.width)/viewer.cellSize));
    yBounds = new Vector(Math.floor(-viewer.pos.y/viewer.cellSize), Math.floor((-viewer.pos.y+canvas.height)/viewer.cellSize));

    for (var x = xBounds.x; x <= xBounds.y; x++)
    {
        for (var y = yBounds.x; y <= yBounds.y; y++)
        {
            var cx = x*viewer.cellSize + viewer.pos.x;
            var cy = y*viewer.cellSize + viewer.pos.y;
            draw.fillStyle = GameofLife.grid.getCell(new Vector(x, y)) ? clr_live : clr_dead;
            
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
function Viewer(pos, zoom)
{
    this.pos = pos;
    this.zoom = zoom;
    this.cellSize = defaultCellSize * zoom;

    function setZoom(z)
    {
        this.zoom = z;

        if (this.zoom < minZoom)
            this.zoom = minZoom;

        this.cellSize = defaultCellSize * zoom;
    }
}

window.onload = Start;