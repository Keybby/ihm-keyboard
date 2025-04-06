import Keyboard from "./keyboard.js";
import Ui from "./ui.js";
import Layer from "./layer.js";
import KeyId from "./key.js";

const TOOL = {
  Move: 0,
  Create: 1,
};

class Point {
  /**
   *
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class App {
  /** @type {Keyboard} */
  keyboard;

  /** @type {number} */
  selectedTool;

  /** @type {number} - index of the layer in the array
   * if -1, it is the default layer */
  selectedLayer;

  /** @type {SVGSVGElement} */
  svg;

  /** @type {Point| null} */
  lastClicked;

  /** @type {Point | null} */
  lastMoved;

  /** @type {KeyId[]} */
  selectedKeys;

  /** @type {Ui} */
  ui;

  constructor() {
    this.keyboard = new Keyboard();
    this.selectedTool = TOOL.Move;
    this.selectedLayer = -1;
    // @ts-ignore
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

  /**
   *
   * @param {number} i
   * @returns {String}
   */
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

  /**
   *
   * @param {number} i
   */
  selectLayer(i) {
    this.selectedLayer = i;
  }

  /**
   *
   * @param {number} i
   * @returns
   */
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

  /**
   *
   * @param {KeyId} id
   * @returns
   */
  getKeyLayout(id) {
    return this.keyboard.getKeyLayout(this.selectedLayer, id);
  }

  /**
   *
   * @param {MouseEvent} evt
   */
  handleMouseDown(evt) {
    const { x, y } = this.getMouseCoordinates(evt);
    const pos = this.getMouseCoordinates(evt);
    this.lastClicked = pos;
    this.lastMoved = pos;
    if (this.selectedTool == TOOL.Create) {
      const newKey = this.keyboard.addKey(x, y);
      this.selectedKeys = [newKey]; //TOCHECK
      console.log(newKey);
    }
  }
  /**
   *
   * @param {MouseEvent} evt
   * @param {KeyId} id
   */
  handleMouseDownOnKey(evt, id) {
    this.selectedKeys = [id];
    const pos = this.getMouseCoordinates(evt);
    this.lastClicked = pos;
    this.lastMoved = pos;
  }

  handleMouseUp() {
    for (const key_id of this.selectedKeys) {
      const translation = this.getTranslation(key_id);
      this.keyboard.geometries.get(key_id).centerX += translation.x;
      this.keyboard.geometries.get(key_id).centerY += translation.y;
    }
    //this.selectedKeys = [];
    this.lastClicked = null;
    this.lastMoved = null;
  }

  /**
   *
   * @param {MouseEvent} evt
   */
  handleMouseMove(evt) {
    if (this.selectedTool == TOOL.Move) {
      this.lastMoved = this.getMouseCoordinates(evt);
    }
  }

  /**
   *
   * @param {KeyId} key_id
   * @returns
   */
  getKeyGeometry(key_id) {
    return this.keyboard.geometries.get(key_id);
  }

  /**
   *
   * @param {KeyId} key_id
   * @returns
   */
  getTranslation(key_id) {
    const selected = this.selectedKeys.includes(key_id) && this.lastClicked;
    return {
      x: selected ? this.lastMoved.x - this.lastClicked.x : 0,
      y: selected ? this.lastMoved.y - this.lastClicked.y : 0,
    };
  }

  /**
   *
   * @param {MouseEvent} evt
   * @returns
   */
  getMouseCoordinates(evt) {
    const CTM = this.svg.getScreenCTM();
    const x = (evt.clientX - CTM.e) / CTM.a;
    const y = (evt.clientY - CTM.f) / CTM.d;
    return {
      x: x,
      y: y,
    };
  }

  /**
   *
   * @param {KeyId} key_id
   */
  keyView(key_id) {
    const geo = this.getKeyGeometry(key_id);
    const trans = this.getTranslation(key_id);
    return {
      trans: this.getTranslation(key_id),
      x: geo.x0() + trans.x,
      y: geo.y0() + trans.y,
      width: geo.width,
      height: geo.height,
      rotation: geo.rotation,
      layout: this.getKeyLayout(key_id),
    };
  }

  sayHello() {
    console.log("hello");
  }

  request_template() {}
}

export default App;
