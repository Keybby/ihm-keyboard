import Keyboard from "./keyboard.js";
import Ui from "./ui.js";
import Layer from "./layer.js";

const TOOL = {
  Move: 0,
  Create: 1,
};

class App {
  constructor() {
    this.keyboard = new Keyboard();
    this.selectedTool = TOOL.Move;
    // index of the layer in the array
    // if -1, it is the default layer
    this.selectedLayer = -1;
    this.svg = document.getElementById("main");
    this.lastClicked = null;
    this.lastMoved = null;
    this.selectedKeys = [];
    this.ui = new Ui();
  }

  setModeMove() {
    this.selectedTool = TOOL.Move;
  }
  setModeCreate() {
    this.selectedTool = TOOL.Create;
  }
  isModeMove() {
    return this.selectedTool == TOOL.Move;
  }
  isModeCreate() {
    return this.selectedTool == TOOL.Create;
  }

  getLayerName(i) {
    console.log(this.keyboard.additionalLayers, i);
    return this.keyboard.getLayer(i).name;
  }
  additionalLayers() {
    return this.keyboard.additionalLayers;
  }

  selectDefaultLayer() {
    this.selectedLayer = -1;
  }

  selectLayer(i) {
    this.selectedLayer = i;
  }

  isActiveLayer(i) {
    return i == this.selectedLayer;
  }

  isActiveLayerDefault() {
    return this.selectedLayer == -1;
  }

  addLayer() {
    const n = this.keyboard.additionalLayers.length + 1;
    this.keyboard.additionalLayers.push(new Layer(`layer ${n}`));
  }

  getKeyLayout(id) {
    return this.keyboard.getKeyLayout(this.selectedLayer, id);
  }

  handleMouseDown(evt) {
    const { x, y } = this.getMouseCoordinates(evt);
    const pos = this.getMouseCoordinates(evt);
    this.lastClicked = pos;
    this.lastMoved = pos;
    if (this.selectedTool == TOOL.Create) {
      this.keyboard.addKey(x, y);
    }
  }
  handleMouseDownOnKey(evt, id) {
    this.selectedKeys = [id];
    const pos = this.getMouseCoordinates(evt);
    this.lastClicked = pos;
    this.lastMoved = pos;
  }

  handleMouseUp(evt) {
    for (const key_id of this.selectedKeys) {
      const translation = this.getTranslation();
      this.keyboard.geometries[key_id].centerX += translation.x;
      this.keyboard.geometries[key_id].centerY += translation.y;
    }
    this.selectedKeys = [];
    this.lastClicked = null;
    this.lastMoved = null;
  }

  handleMouseMove(evt) {
    if (this.selectedTool == TOOL.Move) {
      this.lastMoved = this.getMouseCoordinates(evt);
    }
  }

  previewKeyGeometry(key_id) {
    const geo = this.keyboard.geometries[key_id];
    const isKeySelected = this.selectedKeys.includes(key_id);
    const translation = this.getTranslation(isKeySelected);
    return {
      x: geo.x0() + translation.x,
      y: geo.y0() + translation.y,
      width: geo.getWidth(),
      height: geo.getHeight(),
    };
  }

  getTranslation(checkSelected = true) {
    if (!this.lastClicked || !this.lastMoved) {
      return { x: 0, y: 0 };
    }
    return {
      x: checkSelected ? this.lastMoved.x - this.lastClicked.x : 0,
      y: checkSelected ? this.lastMoved.y - this.lastClicked.y : 0,
    };
  }

  getMouseCoordinates(evt) {
    const CTM = this.svg.getScreenCTM();
    const x = (evt.clientX - CTM.e) / CTM.a;
    const y = (evt.clientY - CTM.f) / CTM.d;
    return {
      x: x,
      y: y,
    };
  }

  sayHello() {
    console.log("hello");
  }

  request_template() {}
}

export default App;
window.App = App;
