let waterTank = null;
let isDragged = false;
let drawingLine = null;
let synth = null;

function setup() {
  const myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('myContainer');
  smooth();
  waterTank = new WaterTank(windowWidth, windowHeight);
  synth = new Tone.MonoSynth({
  	"oscillator" : {
  		"type" : "square"
   },
   "envelope" : {
   	"attack" : 0.1
   }
  }).toMaster();
}

function draw() {
  background(0);
  waterTank.update();
  waterTank.draw();
  if(drawingLine) drawingLine.draw();
}

function mousePressed() {
  drawingLine = new SynthLineMover(synth);
}

function mouseReleased() {
  if(drawingLine.vertexes.length >= 3) {
    drawingLine.start();
    waterTank.confine(drawingLine);
  }
  drawingLine = null;
}

function mouseDragged() {
  drawingLine.pushVertex(createVector(mouseX, mouseY));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
