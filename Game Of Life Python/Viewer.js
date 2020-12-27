// stores info about the user's position in grid/screen space
class Viewer
{
    constructor(pos, zoom)
    {
        this.pos = pos;
        this.zoom = zoom;
        this.cellSize = defaultCellSize * zoom;

        this.needDraw = false;
        this.drawing = false;
        this.newCoords = new NSet();
        this.coordsInLine = new NSet();
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