import KeyGeometry from "./geometry.js";

/**
 * 
 * @param {KeyGeometry} rect 
 * @param {{x: number, y: number}} translation
 * @returns 
 */
function getRotatedCorners(rect, translation) {
    const angleRad = rect.rotation * (Math.PI / 180); // Convert degrees to radians
    const hw = rect.width / 2;
    const hh = rect.height / 2;
  
    const cos = Math.cos(angleRad);
    const sin = Math.sin(angleRad);
  
    // corners relative to center
    return [
      { x: rect.centerX + ( cos * -hw - sin * -hh) + translation.x, y: rect.centerY + ( sin * -hw + cos * -hh) + translation.y}, // top-left
      { x: rect.centerX + ( cos *  hw - sin * -hh) + translation.x, y: rect.centerY + ( sin *  hw + cos * -hh) + translation.y}, // top-right
      { x: rect.centerX + ( cos *  hw - sin *  hh) + translation.x, y: rect.centerY + ( sin *  hw + cos *  hh) + translation.y}, // bottom-right
      { x: rect.centerX + ( cos * -hw - sin *  hh) + translation.x, y: rect.centerY + ( sin * -hw + cos *  hh) + translation.y}  // bottom-left
    ];
  }
  
  /**
  * Projects the corners of a shape onto a given axis and returns the min and max projections.
  * @param {*} axis The axis onto which the corners should be projected (object with `x` and `y` properties).
  * @param {Array.<{x: number, y: number}>} corners An array of corner points (each having `x` and `y` properties).
  * @returns 
  */
  function projectCorners(axis, corners) {
    // Ensure each corner is an object with x and y properties
    const dots = corners.map(p => p.x * axis.x + p.y * axis.y); 
    return { min: Math.min(...dots), max: Math.max(...dots) };
  }
  
  /**
   * 
   * @param {*} vec 
   * @returns 
   */
  function normalize(vec) {
    const len = Math.hypot(vec.x, vec.y);
    return { x: vec.x / len, y: vec.y / len };
  }
  
  /**
   * 
   * @param {*} corners 
   * @returns 
   */
  function getAxes(corners) {
    const axes = [];
    for (let i = 0; i < corners.length; i++) {
      const p1 = corners[i];
      const p2 = corners[(i + 1) % corners.length];
      const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
      const normal = normalize({ x: -edge.y, y: edge.x });
      axes.push(normal);
    }
    return axes;
  }
  
  /**
   * 
   * @param {*} axis 
   * @param {*} cornersA 
   * @param {*} cornersB 
   * @returns 
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
   * @param {{x: number, y: number}} translation
   * @returns 
   */
  export function isRotatedRectColliding(keyGeometry, otherGeometry, translation) {
    const cornersA = getRotatedCorners(keyGeometry, translation);
    const cornersB = getRotatedCorners(otherGeometry, {x: 0, y: 0});
  
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

  