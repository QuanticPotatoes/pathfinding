class Node { 
    
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.neighbors = []
        this.previous = undefined
        this.wall = false
    }
    
    show(color){
        fill(color)
        ellipse(this.x * 20,this.y * 20, 20, 20)
    }
    
    addNeighbors(grid){
    let x = this.x;
    let y = this.y;
    if (x < cols - 1) {
      this.neighbors.push(grid[x + 1][y]);
    }
    if (x > 0) {
      this.neighbors.push(grid[x - 1][y]);
    }
    if (y < rows - 1) {
      this.neighbors.push(grid[x][y + 1]);
    }
    if (y > 0) {
      this.neighbors.push(grid[x][y - 1]);
    }
    if (x > 0 && y > 0) {
      this.neighbors.push(grid[x - 1][y - 1]);
    }
    if (x < cols - 1 && y > 0) {
      this.neighbors.push(grid[x + 1][y - 1]);
    }
    if (x > 0 && y < rows - 1) {
      this.neighbors.push(grid[x - 1][y + 1]);
    }
    if (x < cols - 1 && y < rows - 1) {
      this.neighbors.push(grid[x + 1][y + 1]);
    }
  }
}

