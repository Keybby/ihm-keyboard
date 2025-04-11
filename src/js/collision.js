import KeyGeometry from "./geometry.js";
import { Vec2D } from "./vec.js";

/**
 *
 * @param {KeyGeometry} rect
 * @param {Vec2D} translation
 * @returns {Array<Vec2D>}
 */
function getRotatedCorners(rect, translation) {
  const angleRad = rect.rotation * (Math.PI / 180); // Convert degrees to radians
  const hw = rect.width / 2;
  const hh = rect.height / 2;

  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  const center = new Vec2D(rect.centerX, rect.centerY);

  // corners relative to center
  return [
    // top-left
    new Vec2D(
      center.x + (cos * -hw - sin * -hh) + translation.x,
      center.y + (sin * -hw + cos * -hh) + translation.y,
    ),
    // top-right
    new Vec2D(
      center.x + (cos * hw - sin * -hh) + translation.x,
      center.y + (sin * hw + cos * -hh) + translation.y,
    ),
    // bottom-right
    new Vec2D(
      center.x + (cos * hw - sin * hh) + translation.x,
      center.y + (sin * hw + cos * hh) + translation.y,
    ),
    // bottom-left
    new Vec2D(
      center.x + (cos * -hw - sin * hh) + translation.x,
      center.y + (sin * -hw + cos * hh) + translation.y,
    ),
  ];
}

/**
 * Projects the corners of a shape onto a given axis and returns the min and max projections.
 * @param {Vec2D} axis The axis onto which the corners should be projected.
 * @param {Array<Vec2D>} corners An array of corner points.
 * @returns {{min: number, max: number}}
 */
function projectCorners(axis, corners) {
  const dots = corners.map((p) => Vec2D.dot(p, axis));
  return { min: Math.min(...dots), max: Math.max(...dots) };
}

/**
 *
 * @param {Array<Vec2D>} corners
 * @returns {Array<Vec2D>}
 */
function getAxes(corners) {
  const axes = [];
  for (let i = 0; i < corners.length; i++) {
    const p1 = corners[i];
    const p2 = corners[(i + 1) % corners.length];
    const edge = new Vec2D(p2.x - p1.x, p2.y - p1.y);
    const normal = new Vec2D(-edge.y, edge.x).normalize();
    axes.push(normal);
  }
  return axes;
}

/**
 *
 * @param {Vec2D} axis
 * @param {Array<Vec2D>} cornersA
 * @param {Array<Vec2D>} cornersB
 * @returns {boolean}
 */
function isSeparatingAxis(axis, cornersA, cornersB) {
  const projA = projectCorners(axis, cornersA);
  const projB = projectCorners(axis, cornersB);
  return projA.max < projB.min || projB.max < projA.min;
}

/**
 *
 * @param {KeyGeometry} keyGeometry
 * @param {KeyGeometry} otherGeometry
 * @param {Vec2D} translation
 * @returns {boolean}
 */
export function isRotatedRectColliding(
  keyGeometry,
  otherGeometry,
  translation,
) {
  const cornersA = getRotatedCorners(keyGeometry, translation);
  const cornersB = getRotatedCorners(otherGeometry, new Vec2D(0, 0));

  const axesA = getAxes(cornersA);
  const axesB = getAxes(cornersB);

  const allAxes = [...axesA, ...axesB];

  for (const axis of allAxes) {
    if (isSeparatingAxis(axis, cornersA, cornersB)) {
      return false; // Found a separating axis!
    }
  }

  return true; // No separating axis — collision!
}
