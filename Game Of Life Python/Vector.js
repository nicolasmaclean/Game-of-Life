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
}

