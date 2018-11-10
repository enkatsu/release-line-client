class LineMover {
  constructor() {
    this.vertexes = [];
    this.isStart = false;
    this.isDead = false;
    this.strokeColor = [255, 255, 255];
    this.maxWeight = 10;
    this.boundary = null;
  }

  start() {
    this.isStart = true;
  }

  pushVertex(vertex) {
    this.vertexes.push(vertex);
  }

  bound(i, speed) {
    const next = p5.Vector.add(this.vertexes[i], speed);
    if (0 > next.x || next.x > this.boundary.width) {
      speed.x = -speed.x;
      return speed;
    } else if (0 > next.y || next.y > this.boundary.height) {
      speed.y = -speed.y;
      return speed;
    } else {
      return speed;
    }
  }

  isInside() {
    for (const vertex of this.vertexes) {
      if (
        0 > vertex.x || vertex.x > this.boundary.width ||
        0 > vertex.y || vertex.y > this.boundary.height
      ) {
        return true;
      }
    }
    return false;
  }

  update() {
    if (!this.isStart) return;
    if (this.vertexes.length < 2) return;
    for (let i = 0; i < this.vertexes.length; i++) {
      let speed;
      if (i == this.vertexes.length - 1) {
        speed = p5.Vector.sub(this.vertexes[1], this.vertexes[0]);
      } else {
        speed = p5.Vector.sub(this.vertexes[i + 1], this.vertexes[i]);
      }
      // if(this.boundary) speed = this.bound(i, speed);
      this.vertexes[i].add(speed);
      if(this.isInside()) this.isDead = true;
    }
  }

  draw() {
    if (this.vertexes.length < 2) return;
    push();
    stroke(this.strokeColor);
    for (let i = 0; i < this.vertexes.length - 1; i++) {
      strokeWeight(this.calcWeight(i));
      line(this.vertexes[i].x, this.vertexes[i].y,
        this.vertexes[i + 1].x, this.vertexes[i + 1].y);
    }
    pop();
  }

  calcWeight(i) {
    return map(
      this.vertexes.length / 2 - abs(this.vertexes.length / 2 - i),
      0, this.vertexes.length / 2,
      0, this.maxWeight);
  }
}
