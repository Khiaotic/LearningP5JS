// Attempting to learn about p5.js while remixing https://p5js.org/sketches/2111906/ by Tân Kiàn-tiong（rainsr7235). 
// Learning the basics needs to be tied with something else for me to fully understand. So while I go through the beginning basics tutorials i
//will be noting and experimenting with the basics of p5.js while also trying to create something that I can call my own
//I will like to update this project in a way to express my emotion with recovering from an ankle fracture and still having to adult

/////////////////////////////////////////////////////CODE BREAK/////////////////////////////////////////////////////////////////////////////////

//---My Configuration----//
const donorCellAmount = 50;
let donorCellAverageSize = 50;
const layerAmount = 4;
//number of layers stacked on top of each other

const mitochondriaMode="name"
//donors are the powerhouse of the cell

const nameArray =[];
//donors...1s (name once), 10s (name corresponding)

let donorCellArray =[];
let layerArray =[];

let cameraOffsetX;
let cameraOffsetY;
let cameraV; 

//camera movements/controls
let controllerX, controllerY;

let inputElement;

let mainHue;

let texture;

let xRayImage=[]
////might need to make separate pop js for this


// function preload(){
//   texture= loadImage('')
// } load initial xRay here


function setup (){
  if (windowWidth>600 && windowHeight>600){
    createCanvas(600,600);
  } else {
    createCanvas(windowWidth-50, windowHeight-50)
    donorCellAverageSize = windowWidth/10;
    //creates 600x600px canvas and resizes it to fit other screens
  }

  
  //--Starting Point--//
  pixelDensity(0.8);
  //draws things with fewer dots so computer runs faster

  //---centering the camera---//
  cameraOffsetX= width/2;
  //start looking through camera from middle (left/right)
  cameraOffsetY= height/2;
  //start looking through camera from middle (up.down)

  cameraV= createVector(0,0);
  //camera has no movement yet

  mainHue=random(360);


//---CREATING LAYERS---///
for (let i=0; i < layerAmount; i++){
  //for loop repeats 4 times (layer amount) to create new layers
  const layer =createGraphics(width*2, height*2)
  //makes the layer twice as big as the screen
  layerArray.push(layer);
  //adds layer to stack pile  while leaving previously made layers alone; 
  // push() draws groups that contains
  //its own own style and transformations
}



//---CREATING DONOR CELLS ON LAYERS----//
for (i=0, i < donorCellAmount; i++){
  //make donor cells until specified amount
  donorCellArray.push( new Donor ({
    //will make a new donor while leaving the rest
    p:createVector(random(width*2), random(height*2)),
    //p = position
    //createVector() put cells on x and y coordinates
    //picks random SPOTS for cell to be placed even outside of the canvas(bc *2)
    r:randomGaussian(donorCellAverageSize,10),
    //r = radius (cell size)
    //randomGaussian= picks a size close to the average 
    //with some variations
    layer:floor(random(0,layerAmount))
    //randomly places donor cells on layers in between 1-4
  }))
}
}




