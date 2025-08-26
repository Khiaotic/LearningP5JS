class Donor{
    constructor(thanks){
        ////constructors automatically have a position, size, and layer 
        ////"thanks" is a variable taking placeholder of these attributes 
     this.random = random()
        this.p = thanks.p
            ///cell starting point on the screen
        this.r = thanks.r
            //// cell size
        this.layer = thanks.layer
            ///cells drawn on certain layers
        this.wiggleSpeed = random(0.1,1,1)
            ////how fast the cell wiggles
        this.controlPointAmount = floor(random(10,30))
            ////how many dots make up the cell body
        this.coordinates = []
            ////list of dots that make up the cell body
        this.xRatio = random(0.5,2)
        this.yRatio = random(0.5,2)
        this.name = random(donorCellArray)
        colorMode(HSB)
            //colorMode changes the way color values are interpreted
            //HSB = Hue, Saturation, Brightness
        this.color = color(randomGaussian(mainHue,30)%360,random(50,100),random(50,100),0.5)
            ////picks a cell body color close to the mainHue
            //// %360: if the hue # goes past 360, wrap back around the color wheel
        if(random () < 0.7){
            ///random () < 0.2 is a 1 out of 5 chance (20%) to pick a different color family....so 0.7 is 70% to pick a different color family
            this.color = color(randomGaussian(mainHue+180,30)%360, random (50,100), random(50,100), 0.5)
            ///color() = (R, G, B)
        }

        for (let i=0; i < this.controlPointAmount; i++){
            //makes a BUNCH of dots
            //"this" is ownership. "this.controlPointAmount" is saying "THIS something" belongs to CntlPntAmount
            const angle = map(i,0,this.controlPointAmount, 0, 2*PI)
            //spreads the dots around evenly in a circle
            // map() turns that into an angle from 0 to 2*PI (full circle / about 6.28)
            //each dot gets its own angle dot 0 (angle 0), dot 4 (half way around), etc
            const dots = createVector(
                cos(angle) * this.r * this.xRatio,
                //cos(angle)- left/right (x on map)
                //how big the circle is
                sin(angle) * this.r * this.yRatio
                //cos(angle)- up/down (y on map)
            )

            this.coordinates.push(dots)
                //take the dot and save it in a list called coordinates
        }
    }
update() {
this.p.x += (noise(frameCount*0.01,500*this.random)-0.05)
//this.p.x / this.p.y is the cell's center point 
this.p.x += (noise(frameCount*0.01,-200*this.random)-0.05)
// noise()- returns random numbers that can be tuned to feel organic
//noise is supplying the gentle wiggles
for (let [i, dots] of this.coordinates.entries()){
    const angle = frameCount * 0.0001 * this.wiggleSpeed + i
    const ratio = map(noise(500 + cos(angle)*50,500 + sin(angle)*50),0,1,1,2) 
    dots.setMag(ratio*this.r)
    //pushes the dots closer or farther from the center
    //this is making the cell inhale and exhale
}
}
draw(){
    const layer = layerArray[this.layer]
    layer.push()
    //save the current layer position and style so we don't mess up other things
    layer.noStroke()
    layer.fill(this.color)
    layer.translate(this.p.x, this.p.y)
    //goes to the cell's position
    bezierCircle(this.coordinates, layer)
    //draws the cell/circle
    if(mitochondriaMode ==='name'){
        layer.circle(0,0,this.r/5)
        layer.textAlign(CENTER)
        layer,textSize(this.r*2)
        layer.text(this.name,0,this.r/3)
    }
    layer.pop()
    //stop the drawing
}
}
function bezierCircle(coordinates,layer){
    layer.push();
    const bezierPoints = [];
    //holds the final points we use to draw the curves
    const ctrlPoints = [];
    //holds points between every pair of dots
    for (let i =0; i < coordinates.length; i++){
        const nextIndex = i < coordinates.length - 1 ? i + 1 : 0;
        const start = coordinates[i];
        const end =coordinates[nextIndex];
        ctrlPoints.push([
                    p5.Vector.lerp(start, end, 1/3),
                    //lerp is helping find two helper points between each dot and puts that information into ctrlPoints array
                    //lerp()-calculates a number between two numbers at a specific increment
                    p5.Vector.lerp(start, end, 2/3),

        ]);

    }
    for (let i = 0; i < ctrlPoints.length; i++) {
    const lastIndex = i > 0 ? i - 1 : ctrlPoints.length - 1;
    const nextIndex = i < ctrlPoints.length - 1 ? i + 1 : 0;
    const lastSecPoint = ctrlPoints[lastIndex][1];
    //the second helper from the previous pair
    const nextFirstPoint = ctrlPoints[nextIndex][0];
    //the first helper from the next pair
    const start = p5.Vector.lerp(lastSecPoint, ctrlPoints[i][0], 0.5);
    const end = p5.Vector.lerp(nextFirstPoint, ctrlPoints[i][1], 0.5);
    bezierPoints.push(start);
    bezierPoints.push(ctrlPoints[i][0]);
    bezierPoints.push(ctrlPoints[i][1]);
  }

  layer.beginShape();
  layer.vertex(bezierPoints[0].x, bezierPoints[0].y);
  for (let i = 0; i < bezierPoints.length; i += 3) {
    if (i === bezierPoints.length - 3) {
      layer.bezierVertex(
        bezierPoints[bezierPoints.length - 2].x,
        bezierPoints[bezierPoints.length - 2].y,
        bezierPoints[bezierPoints.length - 1].x,
        bezierPoints[bezierPoints.length - 1].y,
        bezierPoints[0].x,
        bezierPoints[0].y
      );
    } else {
      layer.bezierVertex(
        bezierPoints[i + 1].x,
        bezierPoints[i + 1].y,
        bezierPoints[i + 2].x,
        bezierPoints[i + 2].y,
        bezierPoints[i + 3].x,
        bezierPoints[i + 3].y
      );
    }
  }
  layer.endShape();
  layer.pop();
}