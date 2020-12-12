// basic 4 function vector class

class Vector
{
    constructor(x, y)
    {
        this.x = x;
        this.y = y;
    }

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
}

