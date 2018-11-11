class SynthLineMover extends LineMover {

  constructor(synth) {
    super();
    this.prevAng = null;
    this.synth = synth;
    this.minNote = 440;
    this.maxNote = 880;
  }

  update() {
    super.update();
    this.playSound();
  }

  playSound() {
    if(this.prevAng) {
      const nowAng =
        p5.Vector.sub(this.vertexes[0], this.vertexes[1]).angleBetween(
          p5.Vector.sub(this.vertexes[2], this.vertexes[1]));
      if(this.prevAng - nowAng > PI / 4) {
        const note = map(this.prevAng - nowAng, PI / 4, PI / 2, this.minNote, this.maxNote);
        const duration = map(this.vertexes.length, 0, this.maxLength, 0, 0.05);
        this.synth.triggerAttackRelease(note, duration);
      }
      this.prevAng =
        p5.Vector.sub(this.vertexes[0], this.vertexes[1]).angleBetween(
          p5.Vector.sub(this.vertexes[2], this.vertexes[1]));
    } else {
      this.prevAng =
        p5.Vector.sub(this.vertexes[0], this.vertexes[1]).angleBetween(
          p5.Vector.sub(this.vertexes[2], this.vertexes[1]));
    }
  }

  debugDraw() {
    push();
    stroke(255, 0, 0);
    strokeWeight(3);
    line(this.vertexes[0].x, this.vertexes[0].y,
      this.vertexes[1].x, this.vertexes[1].y);
    pop();
  }
}
