class SynthLineMover extends LineMover {

  constructor(synth) {
    super();
    this.prevAng = null;
    this.synth = synth;
    this.minNote = 440;
    this.maxNote = 880;
    this.minDuration = 0;
    this.maxDuration = 0.05;
    this.thresholdAng = PI / 4;
  }

  update() {
    super.update();
    this.playSound();
  }

  playSound() {
    const reversed = this.vertexes.slice().reverse();
    if(this.prevAng) {
      const nowAng = this.calcHeadAngle();
      if(this.prevAng - nowAng > this.thresholdAng) {
        const note =
          map(this.prevAng - nowAng, this.thresholdAng, PI / 2, this.minNote, this.maxNote);
        const duration =
          map(reversed.length, 0, this.maxLength, this.minDuration, this.maxDuration);
        this.synth.triggerAttackRelease(note, duration);
        this.strokeColor = color(255, 0, 0);
      } else {
        this.strokeColor = color(255);
      }
      this.prevAng = this.calcHeadAngle();
    } else {
      this.prevAng = this.calcHeadAngle();
    }
  }

  calcHeadAngle() {
    const reversed = this.vertexes.slice().reverse();
    return p5.Vector.sub(reversed[0], reversed[1])
      .angleBetween(p5.Vector.sub(reversed[2], reversed[1]));
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
