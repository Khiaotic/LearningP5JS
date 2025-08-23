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
        }

        for (let i=0; i < this.controlPointAmount; i++){
            const angle = map(i,0,this.controlPointAmount, 0, 2*PI)
            const dots = createVector(
                cos(angle) * this.r * this.xRatio,
                sin(angle) * this.r * this.yRatio
            )

            this.coordinates.push(dots)
        }
    }
update() {
this.p.x += (noise(frameCount*0.01,500*this.random)-0.05)
this.p.x += (noise(frameCount*0.01,-200*this.random)-0.05)
for (let [i, dots] of this.coordinates.entries()){
    const angle = frameCount * 0.0001 * this.wiggleSpeed + i
    const ratio = map(noise(500 + cos(angle)*50,500 + sin(angle)*50),0,1,1,2) 
    dots.setMag(ratio*this.r)
}
}
}