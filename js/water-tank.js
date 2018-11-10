class WaterTank {

  constructor(w, h) {
    this.width = w;
    this.height = h;
    this.things = [];
  }

  confine(thing) {
    thing.boundary = this;
    this.things.push(thing);
  }

  update() {
    for (const thing of this.things) {
      thing.update();
    }
  }

  draw() {
    for (const thing of this.things) thing.draw();
  }
}
