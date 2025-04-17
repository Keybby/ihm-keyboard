/**
 *
 * @param {string} id
 * @returns
 */
function getElementById(id) {
  const result = document.getElementById(id);
  if (!result) {
    throw new Error(`${id} not found in DOM`);
  }
  return result;
}

const view = getElementById("svgdiv");
const svg = getElementById("main");
const page = getElementById("ui");

const MIN_SIZE = 500;

class Ui {
  /*
  This class handles the placement of the svg on the screen.
  It handles the scaling and the position of the svg.

  Methods :
  - placeSvg(event) : Handles the placement of the svg on the screen
  - clearResize() : Clears the resize state of the svge
  - setResize(str) : Sets the resize state
  - setViewStyle() : Sets the style of the view if the scale
  is modified
  - resizeHorizontal(event) : Handles the resizing of the svg
  horizontally by the user

  Attributes:
  - scale : The scale of the svg
  - x and y: The position of the svg on the screen
  - dragging : The state of the dragging
  */
  constructor() {
    this.scale = 0.7;
    //initializes the placement of the svg
    this.x = 0;
    this.y = 0;
    this.dragging = "";
    //places the svg
    view.style.transformOrigin = `${this.x}px ${this.y}px`;
    let rect = svg.getBoundingClientRect();
    this.viewBox = {
      x0: 0,
      y0: 0,
      x1: (1 / this.scale) * rect.width,
      y1: (1 / this.scale) * rect.height,
    };
    this.updateViewBox(this.viewBox);
    view.style.transformOrigin = "center center";
  }

  /**
   *
   * @param {WheelEvent} event
   */
  placeSvg(event) {
    //Handles the placement of the svg on the screen
    var deltaY = event.deltaY;
    var deltaX = event.deltaX;
    const threshold = 20;
    if (event.altKey) {
      if (Math.abs(deltaY) > threshold) {
        this.scale = this.scale + Math.sign(deltaY) * 0.1;
        //handling zooming by scrolling with alt pressed
        if (Math.abs(this.scale - 1) <= 0.001) {
          this.scale += Math.sign(deltaY) * 0.1;
        }
      }
    } else if (event.shiftKey) {
      //pans horizontally by modifying this.x
      if (Math.abs(deltaY) > threshold) {
        this.x += Math.sign(deltaY) * 15;
      }
    } else {
      if (Math.abs(deltaY) > threshold) {
        // pans vertically by modifying this.y or horizontally by modifying this.x
        this.y += Math.sign(deltaY) * 15;
      } else if (Math.abs(deltaX) > threshold) {
        this.x += Math.sign(deltaX) * 15;
      }
    }
    this.setViewStyle();
  }

  updateViewBox(view_box) {
    this.viewBox = view_box;
    const { x0, y0, x1, y1 } = view_box;
    svg.setAttribute("viewBox", `${x0} ${y0} ${x1} ${y1}`);
  }

  clearResize() {
    // indicates that the user has stopped resizing the svg
    this.dragging = "";
  }

  /**
   *
   * @param {String} str
   */
  setResize(str) {
    this.dragging = this.dragging.length == 0 ? str : this.dragging;
  }

  setViewStyle() {
    if (this.scale < 0.1) {
      this.scale = 0.1;
    }
    view.style.transform = `scale(${this.scale},${this.scale})`;
    // view.style.transformOrigin = `${this.x}px ${this.y}px`;
    view.style.translate = `${this.x}px ${this.y}px`;
  }

  /**
   *
   * @param {MouseEvent} event
   * @returns
   */
  resizeHorizontal(event) {
    // Extract the scale from the transform style, assuming format like "scale(X)"
    const scale = parseFloat(view.style.transform.substring(6));

    // Exit if mouse event is off-screen or there's no active drag operation
    if (event.clientX <= 0 || this.dragging == "" || this.scale <= 0.3) return;

    // Resize from the bottom edge of the SVG
    if (this.dragging == "svgbottom") {
      let bound = svg.getBoundingClientRect();
      let y = bound.y;
      let diff = event.clientY - y;
      let newHeight = diff / scale;
      if (newHeight < MIN_SIZE) return;
      // Update grid row heights and SVG viewBox height
      view.style.gridTemplateRows = "6px " + newHeight + "px 6px";
      // copy the value, otherwise we are in trouble
      let new_viewbox = { ...this.viewBox };
      new_viewbox.y1 = newHeight;
      this.updateViewBox(new_viewbox);
      this.y += (bound.height - diff)*0.5;
    }

    // Resize from the right edge of the SVG
    else if (this.dragging == "svgright") {
      let bound = svg.getBoundingClientRect();
      let x = bound.x;
      let diff = event.clientX - x;
      let newWidth = diff / scale;
      if (newWidth < MIN_SIZE) return;
      // Update grid column widths and SVG viewBox width
      view.style.gridTemplateColumns = "6px " + newWidth + "px 6px";
      let new_viewbox = { ...this.viewBox };
      new_viewbox.x1 = newWidth;
      this.updateViewBox(new_viewbox);
      this.x += (bound.width - diff)*0.5;
    }
    // Resize from the top edge of the SVG
    else if (this.dragging == "svgtop") {
      let bound = svg.getBoundingClientRect();
      // new size in pixels
      let size = bound.y + bound.height - event.clientY;
      // how much the top edge moved
      let offset = bound.y - event.clientY;
      let newHeight = size / scale;
      if (newHeight < MIN_SIZE) return;
      // Update grid row heights and shift viewBox upward accordingly
      view.style.gridTemplateRows = "6px " + newHeight + "px 6px";
      let new_viewbox = { ...this.viewBox };
      new_viewbox.y0 -= (1 / scale) * offset;
      new_viewbox.y1 = newHeight;
      this.updateViewBox(new_viewbox);
      // Adjust internal y position tracker
      this.y -= offset;
    }
    // Resize from the left edge of the SVG
    else if (this.dragging == "svgleft") {
      let bound = svg.getBoundingClientRect();
      let size = bound.x + bound.width - event.clientX;
      let offset = bound.x - event.clientX;
      let newWidth = size / scale;
      if (newWidth < MIN_SIZE) return;
      // Update grid column widths and shift viewBox left accordingly
      view.style.gridTemplateColumns = "6px " + newWidth + "px 6px";
      let new_viewbox = {
        ...this.viewBox,
      };
      new_viewbox.x0 -= (1 / scale) * offset;
      new_viewbox.x1 = newWidth;
      this.updateViewBox(new_viewbox);
      // Adjust internal x position tracker
      this.x -= offset;
    }
    // Special case: resizing a "side" panel outside the SVG area
    else if (this.dragging == "side") {
      // Compute new width for the right column based on mouse position
      let rightColWidth = page.clientWidth - event.clientX;

      // Update the page layout to reflect new column widths
      let newColDefn = `300px 1fr 1fr 1fr 3px ${rightColWidth}px`;

      page.style.gridTemplateColumns = newColDefn;
    }
    // Apply any necessary visual updates after resizing
    this.setViewStyle();
  }

  zoomIn() {
    this.scale += 0.1;
    if (Math.abs(this.scale - 1) <= 0.001) {
      this.scale += 0.1;
    }
    this.setViewStyle();
  }

  zoomOut() {
    this.scale -= 0.1;
    if (Math.abs(this.scale - 1) <= 0.001) {
      this.scale -= 0.1;
    }
    this.setViewStyle();
  }
}

export default Ui;
