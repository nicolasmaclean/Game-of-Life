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
            UserInput.mouseUp_left(event);
        };

        canvas.onmousedown = function (event)
        {
            if (event.button === 0)
            {
                UserInput.mouseDown_left(event);
            }
        };

        canvas.onmouseleave = function (event)
        {
            UserInput.mouseUp_left(event);
        };
        
        canvas.onwheel = function (event)
        {
            if (event.button === 0)
            {
                UserInput.mouseScroll(event);
            }
        };

        canvas.oncontextmenu = function (e) {
            e.preventDefault();
            UserInput.mouseClick_right(event);
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
    static mouseDown_left(e)
    {
        UserInput.mouse_grabbing = true;
        document.body.style.cursor = "grab";
    }
    
    // lets go of canvas
    static mouseUp_left(e)
    {
        UserInput.mouse_grabbing = false;
        document.body.style.cursor = "default";
    }
    
    // zooms in and out
    static mouseScroll(e)
    {
        UserInput.viewer.addZoom(-e.deltaY / UserInput.scrollDivider)
        UserInput.viewer.needDraw = true;
    }
    
    // selects cell and pushs to list
    static mouseClick_right(e)
    {
        UserInput.viewer.screenCoordsActivated.push(new Vector(e.clientX, e.clientY));
        UserInput.viewer.needDraw = true;
    }
}