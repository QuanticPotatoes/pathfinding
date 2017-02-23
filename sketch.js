let width
let height

let rows = 35
let cols = 35

let graphe = new Array(cols)

let players = []
let openSet = []
let closedSet = []

let start
let end
let path = []
let rand = 0.4


function setup(){
    
    
    for(let i = 0; i < cols; i++){
        graphe[i] = new Array(rows)
        for(let j = 0; j < rows; j++) {
            graphe[i][j] = new Node(i,j)
            
        }
    }
    
    for(let i = 0; i < cols; i++){
        for(let j = 0; j < rows; j++) {
            graphe[i][j].addNeighbors(graphe)
            
            if(random(0,1) < rand){
                graphe[i][j].wall = true
            }

            
        }
    }
    
    start = graphe[0][0]
    end = graphe[cols - 1][rows - 1]
    
    start.wall = false
    end.wall = false
    
    start.f = heuristic(start,end)
    
    openSet.push(start)
      
    width = cols * 20
    height = rows * 20
    
    createCanvas(width,height)
    
    


}

function playerReady() {
    socket.emit('playerReady')

}

function changeName() {

    socket.emit('changeName',this.value())
}


function heuristic(a,b){
    let d = dist(a.x,a.y,b.x,b.y)
    return d
}

function mousePressed(){
    console.log('coucou')
}


function draw() {
    
    
    background(255)
    
    noFill()
    stroke(1)
    
    
    if(openSet.length > 0){
        
        let winner = 0

        openSet.forEach((e,i) => {
            if(e.f < openSet[winner].f){
                winner = i
            }
        })
    
        
        let current = openSet[winner]
        
        
        path = []
        let temp = current
            path.push(temp)
            while(temp.previous)
                {
                    path.push(temp.previous)
                    temp = temp.previous
                }
        if(current === end){
            
            // Meilleur chemin trouvé
            noLoop()
        }
        else {
        
        openSet.splice(openSet.indexOf(current),1)
          //  removeFromArray(graphe,current)
        closedSet.push(current)
        
        let neighbors = current.neighbors
        
        neighbors.forEach((neighbor) => {
            
            if(!closedSet.includes(neighbor) && !neighbor.wall){
               
                let newPath = false
                
                let tempG = current.g + 1
                
                if(openSet.includes(neighbor)) {
                    if(tempG < neighbor.g){
                        neighbor.g = tempG
                    }
                } else {
                    neighbor.g = tempG
                    openSet.push(neighbor)
                    newPath = true
                }
                
                if(newPath) {
                neighbor.h = heuristic(neighbor,end)
                neighbor.f = neighbor.g + neighbor.h
                neighbor.previous = current
                }

                            
        }})
        }
    }
    else {
        
    }
    
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            graphe[i][j].show(255)
        }
    }
    
    openSet.forEach((e) => {
        
        e.show('green')
        
    })
    
    closedSet.forEach((e) => {
        e.show('red')
    })

     strokeWeight(5)
     stroke('blue')
     noFill()
    beginShape()
   
    path.forEach((e) => {
         vertex(e.x * 20 , e.y * 20 );
    })
    endShape()
    strokeWeight(1)
    noStroke()
    
    graphe.forEach((c) => {
        c.forEach((e) => {
            if(e.wall === true){ 
               e.show('black')
            }
        })
    })
}