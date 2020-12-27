
function main()
{
    // NSet.prototype.toString = function setToString() {
    //     return this.arr;
    // }

    // Vector.prototype.toString = function vectorToString() {
    //     return "[" + this.x + ", " + this.y +"]";
    // }

    var set = new NSet();
    set.add(new Vector( 5, 5));
    set.add(new Vector( 6, 5));
    
    console.log('set   : '+set);
    
    var s = new NSet();
    s.add(new Vector( 5, 5));
    s.add(new Vector( 7, 5));
    
    console.log('s     : '+s);
    console.log(' ');
    

    // set = NSet.intersect(set, s);
    set.difference(s);
    console.log('set-s :'+set);
    console.log(set);
}

window.onload = main;