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
    for (let i = 0; i < this.things.length; i++) {
      this.things[i].update();
      if (this.things[i].isDead) this.things.splice(i, 1);
    }
  }

  draw() {
    for (const thing of this.things) {
      thing.draw();
    }
  }
}
