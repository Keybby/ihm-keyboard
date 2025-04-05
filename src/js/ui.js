const view = document.getElementById("svgdiv");
const ui = document.getElementById("ui");
const body = document.getElementsByTagName("body")[0];
const svg = document.getElementsByTagName("svg")[0];
const layers = document.getElementById("layers");

class Ui {
  constructor() {
    this.scale = 0.7;
    this.x = (window.innerWidth * 80) / 100;
    this.y = (window.innerHeight * 60) / 100;
    this.dragging = "";
    view.style.transformOrigin = `${this.x}px ${this.y}px`;

    layers.addEventListener("mousewheel", (evt) => {
      evt.stopPropagation();
    });
    body.addEventListener("mousewheel", (evt) => {
      console.log("scroll");
      this.placeSvg(evt);
    });
    body.addEventListener("click", (evt) => {
      console.log("scroll");
      this.placeSvg(evt);
    });
  }

  placeSvg(event) {
    //Handles the placement of the svg on the screen
    var deltaY = event.deltaY;
    var deltaX = event.deltaX;
    const threshold = 20;
    if (event.altKey) {
      if (Math.abs(deltaY) > threshold) {
        this.scale += Math.sign(deltaY) * 0.1;
      }
    } else if (event.shiftKey) {
      if (Math.abs(deltaY) > threshold) {
        this.x += Math.sign(deltaY) * 50 * this.scale;
      }
    } else {
      if (Math.abs(deltaY) > threshold) {
        this.y += Math.sign(deltaY) * 50 * this.scale;
      } else if (Math.abs(deltaX) > threshold) {
        this.x += Math.sign(deltaX) * 50 * this.scale;
      }
    }
  }

  clearResize() {
    this.dragging = "";
  }

  setResize(str) {
    this.dragging = this.dragging.length == 0 ? str : this.dragging;
  }

  setViewStyle() {
    view.style.transform = `scale(${this.scale},${this.scale})`;
    view.style.transformOrigin = `${this.x}px ${this.y}px`;
  }

  resizeHorizontal(event) {
    const scale = parseFloat(view.style.transform.substring(6));
    let box = svg.getAttribute("viewBox").split(" ");
    if (event.clientX <= 0 || this.dragging == "") return;
    if (this.dragging == "svgbottom") {
      let y = svg.getBoundingClientRect().y;
      let newHeight = (event.clientY - y) / scale;
      view.style.gridTemplateRows = "6px " + newHeight + "px 6px";
      svg.setAttribute("viewBox", `${box[0]} ${box[1]} ${box[2]} ${newHeight}`);
    } else if (this.dragging == "svgright") {
      let x = svg.getBoundingClientRect().x;
      let newWidth = (event.clientX - x) / scale;
      view.style.gridTemplateColumns = "6px " + newWidth + "px 6px";
      svg.setAttribute("viewBox", `${box[0]} ${box[1]} ${newWidth} ${box[3]}`);
    } else if (this.dragging == "svgtop") {
      let bound = svg.getBoundingClientRect();
      let size = bound.y + bound.height - event.clientY;
      let offset = bound.y - event.clientY;
      let newHeight = size / scale;
      view.style.gridTemplateRows = "6px " + newHeight + "px 6px";
      svg.setAttribute(
        "viewBox",
        `${box[0]} ${box[1] - (1 / scale) * offset} ${box[2]} ${newHeight}`,
      );
      this.y -= offset * scale;
    } else if (this.dragging == "svgleft") {
      let bound = svg.getBoundingClientRect();
      let size = bound.x + bound.width - event.clientX;
      let offset = bound.x - event.clientX;
      let newWidth = size / scale;
      view.style.gridTemplateColumns = "6px " + newWidth + "px 6px";
      svg.setAttribute(
        "viewBox",
        `${box[0] - (1 / scale) * offset} ${box[1]} ${newWidth} ${box[3]}`,
      );
      this.x -= offset * scale;
    } else if (this.dragging == "side") {
      let page = document.getElementById("ui");

      let rightColWidth = page.clientWidth - event.clientX;

      let newColDefn = `300px 1fr 1fr 1fr 3px ${rightColWidth}px`;

      page.style.gridTemplateColumns = newColDefn;
    }
    this.setViewStyle();
  }
}

export default Ui;
