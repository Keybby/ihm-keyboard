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
    this.posX = posX;
    this.posY = posY;
  }

  to_svg() {}
}

export default KeyGeometry;
