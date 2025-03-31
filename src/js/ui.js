const view = document.getElementById("main");
const ui = document.getElementById("ui");
const body = document.getElementsByTagName("body")[0];

let scale = 0.7;
let x=window.innerWidth/4;
let y=window.innerHeight/2;

body.addEventListener("mousewheel", function (event) {
  console.log("scroll detected")
  var deltaY = event.deltaY;
  var deltaX = event.deltaX;
  const threshold = 20;
  if (event.altKey) {
    if (Math.abs(deltaY) > threshold) {
      scale+=Math.sign(deltaY) * 0.1
    }
  } else {
    if (Math.abs(deltaY) > threshold) {
      y+=Math.sign(deltaY)*30*scale;
    } else if (Math.abs(deltaX) > threshold) {
      x+=Math.sign(deltaX)*30*scale;
    }
  }
  view.style.transform=`scale(${scale},${scale})`
  view.style.transformOrigin=`${x}px ${y}px`
});

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
