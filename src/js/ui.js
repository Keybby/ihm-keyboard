const view = document.getElementById("main");
const ui = document.getElementById("ui");
const body = document.getElementsByTagName("body")[0];

let scale = 1;


body.addEventListener("mousewheel", function (event) {
  var deltaY = event.deltaY;
  var deltaX = event.deltaX;
  const threshold = 20;
  if (event.altKey) {
    // calc nextScale
    const delta = deltaY || deltaX;
    const scaleStep =
      Math.abs(delta) < 50
        ? 0.05 // touchpad pitch
        : 0.25; // mouse wheel

    const scaleDelta = deltaY < 0 ? scaleStep : -scaleStep;
    const nextScale = scale + scaleDelta; // 'scale' is prev scale

    // calc fixedPoint
    let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    // const fixedPoint = { x: event.clientX, y: event.clientY };
    const fixedPoint = { x: vw/2, y: vh/2 };
     

    // scale
    // 'svgEl' is element to scale
    for (let i = 0; i < view.children.length; i++) {
      svgScale(view.children[i], fixedPoint, scale, nextScale);
    }
    scale = nextScale;
  } else {
    if (Math.abs(deltaY) > threshold) {
      for (let i = 0; i < view.children.length; i++) {
        let y = parseInt(view.children[i].getAttribute("y"));
        y = isNaN(y) ? 0 : y;
        view.children[i].setAttribute("y", y + Math.sign(deltaY) * 2);
      }
    } else if (Math.abs(deltaX) > threshold) {
      for (let i = 0; i < view.children.length; i++) {
        let x = parseInt(view.children[i].getAttribute("x"));
        x = isNaN(x) ? 0 : x;
        view.children[i].setAttribute("x", x + Math.sign(deltaX) * 2);
      }
    }
  }
});

function svgScale(svgEl, fixedPoint, scale, nextScale) {
  const position = {x:svgEl.getAttribute("x"),y:svgEl.getAttribute("y")}
  position.x = isNaN(position.x) ? 0 : position.x;
  position.y = isNaN(position.y) ? 0 : position.y;
  scalechange = nextScale-scale;
  svgEl.setAttribute(
    "x",
    position.x-(fixedPoint.x*scalechange)
  
  );
  svgEl.setAttribute(
    "y",
    position.y-(fixedPoint.y*scalechange)
  );
  svgEl.style.transform =  `scale(${nextScale},${nextScale}`
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
