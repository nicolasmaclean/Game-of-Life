// basic 2d cell with boolean value

class Cell
{
    constructor(bool)
    {
        this.val = bool;
    }

    get getValue()
    {
        return this.val;
    }

    static defaultValue()
    {
        return false;
    }
};