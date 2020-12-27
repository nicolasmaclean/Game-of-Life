// stores info about the user's position in grid/screen space
class Viewer
{
    constructor(pos, zoom, cs)
    {
        this.pos = pos;
        this.zoom = zoom;
        this.cellSize = defaultCellSize * zoom;
        this.mousePos = new Vector(0, 0);
        this.canvasSize = cs;

        this.needDraw = false;
        this.drawing = false;
        this.step = false;
        this.paused = false;
        this.newCoords = new NSet();
        this.coordsInLine = new NSet();
    }

    setZoom(z)
    {
        var zoomP = this.zoom;
        this.zoom = z;

        if (this.zoom < minZoom)
            this.zoom = minZoom;
        else if (this.zoom > maxZoom)
            this.zoom = maxZoom;

        // zoom percentage
        if (this.zoom > zoomP)
        {
            zoomP = -(this.zoom - zoomP) / zoomP;
        }
        else
        {
            zoomP = (zoomP - this.zoom) / this.zoom;
        }

        // zoom offset based on mouse position on canvas
        var offsetP = this.mousePos;
        offsetP.div(this.canvasSize);

        this.pos.add(new Vector(this.canvasSize.x*zoomP*offsetP.x, this.canvasSize.y*zoomP*offsetP.y)); // replace 2 with mousepos/canvasSize

        this.cellSize = defaultCellSize * this.zoom;
    }

    addZoom(a)
    {
        this.setZoom(this.zoom + a);
    }

    // converts screen coord to grid space
    screenToGrid(coord)
    {
        var gridCoord = Vector.sub(coord, viewer.pos);
        gridCoord.sub_int(10);
        gridCoord.div_int(viewer.cellSize);
        gridCoord = Vector.floor(gridCoord);

        return gridCoord;
    }
}