const view = document.getElementById("main");
const ui = document.getElementById("ui");
const body = document.getElementsByTagName("body")[0];

body.addEventListener("mousewheel", function (event) {
  var deltaY = event.deltaY;
  var deltaX = event.deltaX;
  console.log("scrool détecté : ", event);
  const threshold = 20
  if (deltaY > threshold) {
    for (let i = 0; i < view.children.length; i++) {
      view.children[i].y.baseVal.value =
        parseInt(view.children[i].y.baseVal.value) + 2;
    }
  } else if (deltaY < -threshold) {
    for (let i = 0; i < view.children.length; i++) {
      view.children[i].y.baseVal.value =
        parseInt(view.children[0].y.baseVal.value) - 2;
    }
  } else if (deltaX > threshold) {
    for (let i = 0; i < view.children.length; i++) {
      view.children[i].x.baseVal.value =
        parseInt(view.children[i].x.baseVal.value) + 2;
    }
  } else if (deltaX < -threshold) {
    for (let i = 0; i < view.children.length; i++) {
      view.children[i].x.baseVal.value =
        parseInt(view.children[0].x.baseVal.value) - 2;
    }
  }
});
