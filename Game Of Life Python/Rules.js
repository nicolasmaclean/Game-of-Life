// static functions to implement different versions of cellular automata

function ConwayGOL(liveNeighbors, currentState)
{
    return currentState & (liveNeighbors == 2) | (liveNeighbors == 3); 
}