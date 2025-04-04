const view = document.getElementById("svgdiv");
const ui = document.getElementById("ui");
const body = document.getElementsByTagName("body")[0];
const svg = document.getElementsByTagName("svg")[0];
const layers = document.getElementById("layers");

// svg.style.width = svg.clientWidth;
// svg.style.height = svg.clientHeight;
//Fixes the height of the svg once loaded

let scale = 0.7;
let x = (window.innerWidth * 80) / 100;
let y = (window.innerHeight * 60) / 100;
view.style.transformOrigin = `${x}px ${y}px`;

body.addEventListener("mousewheel", function (event) {
  //Handles the placement of the svg on the screen
  var deltaY = event.deltaY;
  var deltaX = event.deltaX;
  const threshold = 20;
  if (event.altKey) {
    if (Math.abs(deltaY) > threshold) {
      scale += Math.sign(deltaY) * 0.1;
    }
  } else if (event.shiftKey) {
    if (Math.abs(deltaY) > threshold) {
      x += Math.sign(deltaY) * 50 * scale;
    }
  } else {
    if (Math.abs(deltaY) > threshold) {
      y += Math.sign(deltaY) * 50 * scale;
    } else if (Math.abs(deltaX) > threshold) {
      x += Math.sign(deltaX) * 50 * scale;
    }
  }
  view.style.transform = `scale(${scale},${scale})`;
  view.style.transformOrigin = `${x}px ${y}px`;
});

let dragging = "";

function clearResize() {
  dragging = "";
}

function setResize(str) {
  dragging = dragging.length == 0 ? str : dragging;
}

function resizeHorizontal(event) {
  let scale = parseFloat(view.style.transform.substring(6));
  let box = svg.getAttribute("viewBox").split(" ");
  if (event.clientX <= 0 || dragging == "") return;
  if (dragging == "svgbottom") {
    let y = svg.getBoundingClientRect().y;
    let newHeight = (event.clientY - y) / scale;
    view.style.gridTemplateRows = "6px " + newHeight + "px 6px";
    svg.setAttribute("viewBox", `${box[0]} ${box[1]} ${box[2]} ${newHeight}`);
  } else if (dragging == "svgright") {
    let x = svg.getBoundingClientRect().x;
    let newWidth = (event.clientX - x) / scale;
    view.style.gridTemplateColumns = "6px " + newWidth + "px 6px";
    svg.setAttribute("viewBox", `${box[0]} ${box[1]} ${newWidth} ${box[3]}`);
  } else if (dragging == "svgtop") {
    let bound = svg.getBoundingClientRect();
    let size = bound.y + bound.height - event.clientY;
    let offset = bound.y - event.clientY;
    let newHeight = size / scale;
    view.style.gridTemplateRows = "6px " + newHeight + "px 6px";
    svg.setAttribute(
      "viewBox",
      `${box[0]} ${box[1] - (1 / scale) * offset} ${box[2]} ${newHeight}`
    );
    y -= offset * scale;
    view.style.transformOrigin = `${x}px ${y}px`;
  } else if (dragging == "svgleft") {
    let bound = svg.getBoundingClientRect();
    let size = bound.x + bound.width - event.clientX;
    let offset = bound.x - event.clientX;
    let newWidth = size / scale;
    view.style.gridTemplateColumns = "6px " + newWidth + "px 6px";
    svg.setAttribute(
      "viewBox",
      `${box[0] - (1 / scale) * offset} ${box[1]} ${newWidth} ${box[3]}`
    );
    x -= offset * scale;
    view.style.transformOrigin = `${x}px ${y}px`;
  } else if (dragging == "side") {
    let page = document.getElementById("ui");

    let rightColWidth = page.clientWidth - event.clientX;

    let newColDefn = `300px 1fr 1fr 1fr 3px ${rightColWidth}px`;

    page.style.gridTemplateColumns = newColDefn;
  }
  event.preventDefault();
}

// Drag tool
function getMousePosition(evt) {
  var svg = evt.target;

  var CTM = svg.getScreenCTM();
  return {
    x: isNaN(evt.clientX) ? 0 : (evt.clientX - CTM.e) / CTM.a,
    y: isNaN(evt.clientY) ? 0 : (evt.clientY - CTM.f) / CTM.d,
  };
}

function makeDraggable(evt) {
  var selectedElement = false;
  var offset;

  var svg = evt.target;
  svg.addEventListener("mousedown", startDrag);
  svg.addEventListener("mousemove", drag);
  svg.addEventListener("mouseup", endDrag);
  svg.addEventListener("mouseleave", endDrag);

  function startDrag(evt) {
    selectedElement = evt.target;
    offset = getMousePosition(evt);
    offset.x = isNaN(parseFloat(selectedElement.getAttribute("x")))
      ? 0
      : offset.x - parseFloat(selectedElement.getAttribute("x"));
    offset.y = isNaN(parseFloat(selectedElement.getAttribute("y")))
      ? 0
      : offset.y - parseFloat(selectedElement.getAttribute("y"));
    console.log();
  }
  function drag(evt) {
    if (selectedElement) {
      evt.preventDefault();
      var coord = getMousePosition(evt);
      selectedElement.setAttribute("x", coord.x - offset.x);
      selectedElement.setAttribute("y", coord.y - offset.y);
    }
  }
  function endDrag(evt) {
    selectedElement = null;
  }
}

layers.addEventListener("mousewheel", (evt) => {
  evt.stopPropagation();
});

function unfoldLayer(id) {
  const elem = document.getElementById(id);
  let folded = elem.getAttribute("folded") == "true";
  elem.children[0].textContent = folded ? "v" : ">";
  elem.children[1].hidden = !folded;
  elem.setAttribute("folded", !folded);
}
