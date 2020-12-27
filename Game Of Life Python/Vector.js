// basic 4 function vector class

class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

    // basic 4 operations
    add(other_vector)
    {
        this.x += other_vector.x;
        this.y += other_vector.y;
    }
    
    sub(other_vector)
    {
        this.x -= other_vector.x;
        this.y -= other_vector.y;
    }

    mult(other_vector)
    {
        this.x *= other_vector.x;
        this.y *= other_vector.y;
    }

    div(other_vector)
    {
        this.x /= other_vector.x;
        this.y /= other_vector.y;
    }

    equals(other_vector)
    {
        return this.x === other_vector.x && this.y === other_vector.y;
    }

    add_int(value)
    {
        this.x += value;
        this.y += value;
    }
    
    sub_int(value)
    {
        this.x -= value;
        this.y -= value;
    }

    mult_int(value)
    {
        this.x *= value;
        this.y *= value;
    }

    div_int(value)
    {
        this.x /= value;
        this.y /= value;
    }

    equals_int(value)
    {
        return this.x === value && this.y === value;
    }

    equals(other_vector)
    {
        return this.x === other_vector.x && this.y === other_vector.y;
    }

    floor()
    {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
    }

    ceil()
    {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
    }

    abs()
    {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
    }

    // static versions of above methods that will return new vectors, instead of modifying one of them
    static add(vector, other_vector)
    {
        return new Vector(vector.x + other_vector.x, vector.y + other_vector.y);
    }

    static sub(vector, other_vector)
    {
        return new Vector(vector.x - other_vector.x, vector.y - other_vector.y);
    }
    
    static mult(vector, other_vector)
    {
        return new Vector(vector.x * other_vector.x, vector.y * other_vector.y);
    }
    
    static div(vector, other_vector)
    {
        return new Vector(vector.x / other_vector.x, vector.y / other_vector.y);
    }

    static equals(vector, other_vector)
    {
        return vector.x === other_vector.x && vector.y === other_vector.y;
    }

    static zero()
    {
        return new Vector(0, 0);
    }

    static floor(vector)
    {
        return new Vector(Math.floor(vector.x), Math.floor(vector.y));
    }

    static ceil(vector)
    {
        return new Vector(Math.ceil(vector.x), Math.ceil(vector.y));
    }

    static abs(vector)
    {
        return new Vector(Math.abs(vector.x), Math.abs(vector.y));
    }

    toString()
    {
        return "[" + this.x + ", " + this.y +"]";
    }
}

