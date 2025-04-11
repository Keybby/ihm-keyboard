/**
 * Class representing a 2D position or vector
 */
export class Vec2D {
  /**
   * Creates a new 2D vector
   * @param {number} x - X coordinate
   * @param {number} y - Y coordinate
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Normalizes this vector (creates a unit vector in the same direction)
   * @returns {Vec2D} A new normalized vector
   */
  normalize() {
    const len = Math.hypot(this.x, this.y);
    return new Vec2D(this.x / len, this.y / len);
  }

  /**
   * Multiplies this vector by a scalar
   * @param {number} scalar - The scalar value
   * @returns {Vec2D} The resulting vector
   */
  multiply(scalar) {
    return new Vec2D(this.x * scalar, this.y * scalar);
  }

  /**
   * Calculates the dot product with another vector
   * @param {Vec2D} other - Other vector
   * @returns {number} The dot product of the two vectors
   */
  dot(other) {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Static method to calculate dot product of two vectors
   * @param {Vec2D} a - First vector
   * @param {Vec2D} b - Second vector
   * @returns {number} The dot product of the two vectors
   */
  static dot(a, b) {
    return a.x * b.x + a.y * b.y;
  }
}

/**
 * Zero vector constant
 * @type {Vec2D}
 */
export const ZERO = new Vec2D(0, 0);
