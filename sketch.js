var cols=25;
var rows=25;
var grid = new Array(cols);
var openSet=[];
var closedSet=[];
var start;
var end;
var w;
var h;
var path=[];
var pathNotFound=false;
var flag=0;
var current;

function setFlag(){
  flag=1;
}


function Spot(i,j){
  this.i=i;
  this.j=j;
  
  this.f=0;
  this.g=0;
  this.h=0;

  this.neighbours=[]
  this.previous=undefined;
  this.wall=false;

  if (random(1)<0){
    this.wall=true;
  }

  this.show = function(c) {
    fill(c);
    if(this.wall){
      fill(0);
    }
    if(this.i==cols-1 && this.j==rows-1){
      fill(color(150,11,156));
      this.wall=false;
    }
    noStroke(); 
    rect(this.i*w,this.j*h,w-1,h-1)
  }
  this.addNeighbours = function(grid){
    let i=this.i;
    let j=this.j;
    if(i<cols-1){
    this.neighbours.push(grid[i+1][j]);}
    if(i>0){
    this.neighbours.push(grid[i-1][j]);}
    if(j<rows-1){
    this.neighbours.push(grid[i][j+1]);}
    if(j>0){
    this.neighbours.push(grid[i][j-1]);
    }
    if(i>0 && j>0){
      this.neighbours.push(grid[i-1][j-1]);
    }
    if(i<cols-1 && j<rows-1){
      this.neighbours.push(grid[i+1][j+1]);
    }
    if(i>0 && j<rows-1){
      this.neighbours.push(grid[i-1][j+1]);
    }
    if(i<cols-1 && j>0){
      this.neighbours.push(grid[i+1][j-1]);
    }
  }
}

function removeItemArray(arr, value) {
  for(let i =arr.length-1;i>=0;i--){
    if(arr[i]==value){
      arr.splice(i,1)
    }
  }
}



function setup() {
  let cnv=createCanvas(400, 400);
  cnv.position(50, 280);
  
  
  w=width/cols;
  h=height/rows;
  
  for(let i =0;i<cols;i++){
    grid[i]=new Array(rows);
  }  
  
  for(let i =0;i<cols;i++){
    for(let j =0;j<rows;j++){
      grid[i][j]= new Spot(i,j);
    }  
  }

   for(let i =0;i<cols;i++){
    for(let j =0;j<rows;j++){
      grid[i][j].addNeighbours(grid);
    }  
  }
  
  start= grid[0][0];
  end=grid[cols-1][rows-1];
  start.wall=false;
  end.wall=false;
  
  openSet.push(start);

  
}


function findPath(){
  if (openSet.length>0){
          
            var t=0;
            for(let i=0;i<openSet.length;i++){
              if (openSet[i].f<openSet[t].f){
                t=i;
              }
            }

            current=openSet[t];

            if (current===end){

                      noLoop();
              console.log("Path Found !!!");
              alert("Path Found !!!");
            }
            closedSet.push(current);
            removeItemArray(openSet,current);

            var neighbours=current.neighbours;
            for (var i=0;i<neighbours.length;i++){
              var neighbour = neighbours[i];


              if(!closedSet.includes(neighbour) && !neighbour.wall){
                var tempG= current.g+1;

                var  newPath =false;
                if (openSet.includes(neighbour)){
                  if(tempG<neighbour.g){
                    neighbour.g=tempG;
                  }
                }else{
                  neighbour.g=tempG;
                  newPath=true;
                  openSet.push(neighbour);
                }
                if(newPath)
                {neighbour.h=heuristic(neighbour,end);
                                neighbour.f=neighbour.g+neighbour.h;
                                neighbour.previous=current;}
              }
        }
      }
        else{
          console.log("Path Not Found!!")
          alert("No Path Available !!!");
          pathNotFound=true;
          noLoop();
        }
        
         for(let i =0;i<cols;i++){
          for(let j =0;j<rows;j++){
            grid[i][j].show(color(255));
          }  
        }
        return current;
}

function heuristic(a,b){
  var d =dist(a.i,a.j,b.i,b.j);
  return d;
}

function draw() {


  background(220);
  for(let i =0;i<cols;i++){
          for(let j =0;j<rows;j++){
            grid[i][j].show(color(255));
          }  
        }
  if(flag){
        findPath();
      }
  for(let i of openSet){
    i.show(color(0,255,0));
  }
  for(let i of closedSet){
    i.show(color(255,0,0));
  }
  if (!pathNotFound && flag){
    path=[];
  let temp=current;
  path.push(temp)
  while(temp.previous){
    path.push(temp.previous);
    temp=temp.previous;
  }

  for(let i of path){
    i.show(color(0,0,255))
  }
  }
  strokeWeight(40);
  rect(400, 400, 400, 400);
}

function mouseDragged(){
  if (mouseX<width && mouseY<height){
  let m = map(mouseX, 0, width, 0, cols,true);
  let n = map(mouseY, 0, height, 0, rows,true);
  m=int(m);
  n=int(n);
  grid[m][n].wall=true;
  // try{
  //   grid[m+1][n+1].wall=true;
  //   grid[m][n+1].wall=true;
  //   grid[m+1][n].wall=true;
  //   grid[m-1][n-1].wall=true;
  //   grid[m-1][n].wall=true;
  //   grid[m-1][n+1].wall=true;
  //   grid[m+1][n-1].wall=true;
  // }
  // catch{
  //   pass;
  // }
  }
  // let m = map(mouseX, 0, width, 0, cols-1,true);
  // let n = map(mouseY, 0, height, 0, rows-1,true);
  // grid[int(m)][int(n)].wall=true;
  console.log(cols);
  console.log(mouseY);
}
