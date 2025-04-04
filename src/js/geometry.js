const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 100;

class KeyGeometry {
  constructor(
    posX,
    posY,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    rotation = 0,
  ) {
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.centerX = posX;
    this.centerY = posY;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  x0() {
    return this.centerX - this.width / 2;
  }
  x1() {
    return this.centerX + this.width / 2;
  }
  y0() {
    return this.centerY - this.height / 2;
  }
  y1() {
    return this.centerY + this.height / 2;
  }
}

export default KeyGeometry;
