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

const nameArray =["Glory D", "Bunzy", "Taylor R"];
//donors...,10s (once), 20s (twice)

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


function preload(){
  texture= loadImage('mask_img_test');
 } 
//load initial xRay here


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
  const layer = createGraphics(width*2, height*2)
  //makes the layer twice as big as the screen
  layerArray.push(layer);
  //adds layer to stack pile  while leaving previously made layers alone; 
  // push() draws groups that contains its own own style and transformations
}



//---CREATING DONOR CELLS ON LAYERS----//
for (i=0; i < donorCellAmount; i++){
  //make donor cells until specified amount
  donorCellArray.push( new Donor ({
    // push () is saving these specific settings below
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
inputElement=select("focal-length")
//referenced in configuration at the top "inputElement" is a VARIABLE not f(x)
//select() searches for the FIRST element that css selector string ("")

///END of setUp f(x)
}

////----CREATING THE VISUALS----////
function draw (){
  push()
  ///what i put below this only affects what is below and not the rest of the canvas

  translate(cameraOffsetX, cameraOffsetY)
  //translate()- shifts the origin (top left in 2D mode/ center in WebGL mode) to a different position

  //need to either do an order function for bg or random
  //background()

  for (let layer of layerArray) {
    layer.clear()
    //clear()- clears the pixels on the canvas
    //wipe each layer clean before drawing anything new
    // this means in 60frames a second, p5.js will wipe -> draw wipe -> draw and not leave ghost trails
  }
  for (let donor of donorCellArray) {
    donor.update()
    //updates with movement
    donor.draw()
    //draws donors cells in the new position after the 60frames/sec
  }

  for (let [i,layer] of layerArray.entries()){
    //--control the layer stack that is focused on--//
    const focalLength = map(inputElement.value(), 0, 10, -1, layerAmount)
        // map()-converts one element to another || format map(i1, i2, i3, i4, i5)

        // (in this case): map(inputEle.value, 0, 10 ) sets slider range from 0 to 10 || with inputEle.value being its original state
        // (continued): converts 0-10 range to (-1, layerAmount (4))
                // if he slider is at 0---it converts to -1
               // if the slider is at 10--- it converts to 4

    const blurRatio=map(abs(i-focalLength), 0, 10, 0, 20 )
    //if the difference of the current layer focus is 0 then the blur is 0
    //if the "" ""   "" "" " " is 10 or more then the blur is 20 )very blurry)

    layer.filter(BLUR, blurRatio)
    push();
    imageMode(CENTER)
    //centers the image

    scale(1)
    image(layer,0,0)
// shows the layer on the screen

    pop();
  }

  pop()

  ///tint?/blendmodes idk yet

////----Slider/Control Functionality-----/////
if (mouseIsPressed && dist(mouseX, mouseY, width/2, height/2) < width/2){
  fill ("#000000F")
noStroke()
circle(controllerX, controllerY, 100)
const placement = dist(mouseX, mouseY, controllerX, controllerY)
//dist is measuring the distance the mouse is from the center
const angle = atan2((mouseY-controllerY), (mouseX-controllerX))
//atan2: Calculates the angle formed by a point, the origin, and the positive x-axis
    //(continued) The first parameter is the point's y-coordinate and the second parameter is its x-coordinate

if (d < 40) {
  circle (mouseX, mouseY, 20)
} else {
  circle(controllerX+cos(angle)*40, controllerY+sin(angle)*40,20)
}
 
cameraV= createVector(cos(angle), sin(angle))
cameraV.setMag(map(d < 40?d:40,0,40,0,3))
} else {
  ////if MOUSE IS NOT PRESSED
  cameraV.mult(0.9)
  ////camera movement friction (slow)
  ////this is undefined because it only works on vectors, so only occurs if the mouse is not pressed (else)
}
cameraOffsetX += cameraV.x 
cameraOffsetY =+ cameraV.y 

/////---KeyPresses Movement----///////
if(keyIsPressed){
		if(key === 'w' || key === 'W'){
			cameraOffsetY+=2
		}
		if(key === 's' || key === 'S'){
			cameraOffsetY-=2
		}
		if(key === 'a' || key === 'A'){
			cameraOffsetX+=2
		}
		if(key === 'd' || key === 'D'){
			cameraOffsetX-=2
		}
	}
  /////stops the camera from going off screen///////
	if(cameraOffsetX<0)cameraOffsetX=0
	if(cameraOffsetX>width)cameraOffsetX=width
	if(cameraOffsetY<0)cameraOffsetY=0
	if(cameraOffsetY>width)cameraOffsetY=width
}

function mousePressed(){
	controllerX = mouseX
	controllerY = mouseY
  ////sets controller based on where the cursor/mouse is clicked
}


