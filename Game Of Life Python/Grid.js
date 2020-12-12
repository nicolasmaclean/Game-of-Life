// a sparse matrix (dictionary implementation) that stores the value of each cell
// TODO: setCell, getCell needs to be reconfigured if a version other than gamme of life is use

class Grid
{
    constructor()
    {
        this.mat = new Map();
    }

    // gets cell value if its a valid key or gets the default value
    // TODO: replace true with "this.mat[pos]" and replace false with "Cell.defaultValue"
    getCell(pos)
    {
        var str = pos.x + " " + pos.y;
        if (this.mat.has(str))
            return true;
        else
            return false;
    }

    // sets the value of the cell at pos with val
    // tweak the if statement for a more dynamic sparse check
    setCell(pos, val)
    {
        var str = pos.x + " " + pos.y;
        if (val)
            this.mat.set(str, val);
        else if (this.mat.has(str))
            this.mat.delete(str);
    }

    // returns a list of cells neighboring given cell
    getNeighboringCells(pos)
    {
        neighbors = []
        
        for (var x = -1; x <= 1; x++)
            for (var y = -1; y <= 1; y++)
                if (x != 0 || y != 0)
                    neighbors.push(getCell)

        return neighbors;
    }
}