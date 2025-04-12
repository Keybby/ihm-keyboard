import { Vec2D } from "./vec.js";

const DEFAULT_WIDTH = 80;
const DEFAULT_HEIGHT = 75;

class KeyGeometry {
  /*
  This class is used to calculate the geometry of a key on a keyboard.
  Attributes :
  - center: position of the center of the key
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
   * @param {Vec2D} center
   * @param {number} width
   * @param {number} height
   * @param {number} rotation
   */
  constructor(
    center,
    // we initialize the width and height to default values
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    rotation = 0,
  ) {
    this.width = width;
    this.height = height;
    this.rotation = rotation;
    this.center = center;
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
    return this.center.x - this.width / 2;
  }
  x1() {
    return this.center.x + this.width / 2;
  }
  y0() {
    return this.center.y - this.height / 2;
  }
  y1() {
    return this.center.y + this.height / 2;
  }

  /**
   *
   * @param {Vec2D} vec
   */
  translate(vec) {
    this.center.x += vec.x;
    this.center.y += vec.y;
  }

  getVectorRight() {
    return new Vec2D(this.width, 0).rotated(this.rotation);
  }
  getVectorUp() {
    return new Vec2D(0, this.height).rotated(this.rotation);
  }
}

export default KeyGeometry;
export { DEFAULT_WIDTH, DEFAULT_HEIGHT };
