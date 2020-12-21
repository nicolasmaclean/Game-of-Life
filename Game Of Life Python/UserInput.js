class UserInput
{
    constructor(viewer, canvas)
    {
        // static variables
        UserInput.viewer = viewer;
        UserInput.mouse_grabbing = false;
        UserInput.scrollDivider = 15;

        // adds mouse events
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

        canvas.onmouseleave = function (event)
        {
            UserInput.mouseUp(event);
        };

        canvas.onwheel = function (event)
        {
            UserInput.mouseScroll(event);
        };
    }

    // moves the viewer by mouse delta on mousemove event
    static mouseMove(e)
    {
        if(UserInput.mouse_grabbing)
        {
            UserInput.viewer.pos.add(new Vector(e.movementX, e.movementY));
            UserInput.viewer.needDraw = true;
        }
    }
    
    // grabs canvas
    static mouseDown(e)
    {
        UserInput.mouse_grabbing = true;
        document.body.style.cursor = "grab";
    }
    
    // lets go of canvas
    static mouseUp(e)
    {
        UserInput.mouse_grabbing = false;
        document.body.style.cursor = "default";
    }

    static mouseScroll(e)
    {
        UserInput.viewer.addZoom(-e.deltaY / UserInput.scrollDivider)
    }
}