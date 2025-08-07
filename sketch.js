// Attempting to learn about p5.js while remixing https://p5js.org/sketches/2111906/ by Tân Kiàn-tiong（rainsr7235). 
// Learning the basics needs to be tied with something else for me to fully understand. So while I go through the beginning basics tutorials i
//will be noting and experimenting with the basics of p5.js while also trying to create something that I can call my own
//I will like to update this project in a way to express my emotion with recovering from an ankle fracture and still having to adult

/////////////////////////////////////////////////////CODE BREAK/////////////////////////////////////////////////////////////////////////////////

//---My Configuration----//
//don't know if this is the amount on the canvas at one time or a different variable...will find out
// let cellBodyAmount= 90

// //average size of the cell bodies...havent figured out what i want to display in them yet
// let cellBodyAverageSize = 50


// /// let "sentimentArry equal and empty object...sentiment meaning my emotions"
// const sentimentArray = []



function setup() {
  //canvas is 600 x 600 px 
  createCanvas(600, 600);
  noFill();
  stroke(0);
}

function draw() {
  background(255, 245, 215);
  
  //adding this to show points/ where my mouse is on my canvas
  text(`${mouseX}, ${mouseY}`, 20, 20);
  
  //starts drawing the shape
  beginShape();

  //the FIRST point..
  vertex(300, 200)
///(curve start left/right, curve start up/down, BEVEL, curve end left/right, curve end up/down END point)
  bezierVertex(300, 200, 400, 200, 400, 300)
    //Top Right Curve
    //starts at 300 because vertex (initial point) starts at and ends at 300

    //up 1....up 2....down 1...up 2...down 1....up 1
  bezierVertex(400, 400, 300, 400, 300, 400)
    //Bottom right curve

  //down 2...same...down 1....down 1...down 1...down 1
  bezierVertex(200, 400, 200, 300, 200, 300)
  //Bottom left curve
  
  //same....up 2...up  1...down 1...up 1...down 1
  bezierVertex(200, 200, 300, 200, 300, 200)
  //Top left curve

  endShape();
};




//  noFill();
///---20250707 i want to make the undulating wavy circle shape using the bezier method of the author and understand it--- 
///---im on variables and change---
//  //adds first anchor point
//  vertex (200, 200);
//  bezierVertex(200, 0, 0, 0, 168, 133);

// ////add bezier curves
// //// the first four set the curve! 
// //the LAST anchor sets the END point!! 
// // (curve, curve, curve, curve, anchor left/right, anchor up/down)///
// bezierVertex(100, 20, 90, 90, 30, 90);