const DEFAULT_WIDTH = 80;
const DEFAULT_HEIGHT = 75;

class KeyGeometry {
  /*
  This class is used to calculate the geometry of a key on a keyboard.
  Attributes : 
  - posX : x position of the center of the key
  - posY : y position of the center of the key
  - width : width of the key
  - height : height of the key
  - rotation : rotation of the key in degrees
  methods : 
  - setX : set the x position of the key
  - setY : set the y position of the key
  - getWidth : get the width of the key
  - getHeight : get the height of the key
  - getRotation : get the rotation of the key
  - x0, x1, y0, y1 : get the coordinates of the corners of the key
  - constructor : initialize the key geometry with the given parameters
  */
  /**
   *
   * @param {number} posX
   * @param {number} posY
   * @param {number} width
   * @param {number} height
   * @param {number} rotation
   */
  constructor(
    posX,
    posY,
    // we initialize the width and height to default values
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    rotation = 0
  ) {
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.centerX = posX;
    this.centerY = posY;
  }

  /**
   *
   * @param {number} x
   */
  setX(x) {
    // set the x coordinate of the center of the key
    this.centerX = x;
  }

  /**
   *
   * @param {number} y
   */
  setY(y) {
    // set the y coordinate of the center of the key
    this.centerY = y;
  }

  getWidth() {
    // get the width of the key
    return this.width;
  }

  getHeight() {
    // get the height of the key
    return this.height;
  }

  getRotation() {
    // get the rotation factor
    return this.rotation;
  }
  // we get the coordinates of the corners of the key
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

  /**
   *
   * @param {KeyGeometry} a
   * @param {KeyGeometry} b
   */
  static getDistance(a, b) {
    return Math.sqrt(
      (a.centerX - b.centerX) ** 2 + (a.centerY - b.centerY) ** 2
    );
  }
}

export default KeyGeometry;
export { DEFAULT_WIDTH, DEFAULT_HEIGHT };
