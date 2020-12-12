class UserInput
{
    constructor(viewer, canvas)
    {
        UserInput.viewer = viewer;
        UserInput.mouse_grabbing = false;

        canvas.onmousemove = function (event)
        {
            UserInput.mouseMove(event);
        };

        canvas.onmouseup = function (event)
        {
            UserInput.mouseUp(event);
        };

        canvas.onmousedown = function (event)
        {
            UserInput.mouseDown(event);
        };
    }

    static mouseMove(e)
    {
        if(UserInput.mouse_grabbing)
        {
            UserInput.viewer.pos.add(new Vector(e.movementX, e.movementY));
        }
    }
    
    static mouseDown(e)
    {
        UserInput.mouse_grabbing = true;
    }
    
    static mouseUp(e)
    {
        UserInput.mouse_grabbing = false;
    }
}