
function main()
{
    var v1 = new Vector(0, 0);
    var v2 = new Vector(0, 5);

    console.log("v1: " + v1);
    console.log("v2: " + v2);

    var arr = UserInput.lineGen(v1, v2);
    console.log(arr);
}

window.onload = main;