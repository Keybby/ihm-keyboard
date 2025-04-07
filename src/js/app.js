import Keyboard from "./keyboard.js";
import Ui from "./ui.js";
import Layer from "./layer.js";
import KeyId from "./key.js";
import Popup from "./popup.js";
import { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "./geometry.js";

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

  /** @type {Boolean} */
  changingNameLayer;

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

  /** @type {Popup} */
  popup;

  constructor() {
    this.keyboard = new Keyboard();
    this.selectedTool = TOOL.Move;
    this.selectedLayer = -1;
    this.changingNameLayer = false;
    // @ts-ignore
    this.svg = document.getElementById("main");
    this.lastClicked = null;
    this.lastMoved = null;
    this.selectedKeys = [];
    this.ui = new Ui();
    this.popup = new Popup();

    this.toolWidth = DEFAULT_WIDTH;
    this.toolHeight = DEFAULT_HEIGHT;
    this.toolRotation = 0;
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
   * @returns {String}
   */
  getDefaultLayerName() {
    return this.keyboard.defaultLayer.name;
  }

  /**
   *
   * @param {number} i
   * @returns {String}
   */
  getLayerName(i) {
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

  enterNameLayer() {
    this.changingNameLayer = true;
  }

  /**
   *
   * @returns
   */
  isChangedDefaultLayer() {
    return this.selectedLayer == -1 && this.changingNameLayer;
  }

  /**
   *
   * @param {number} i
   * @returns
   */
  isChangedLayer(i) {
    return i == this.selectedLayer && this.changingNameLayer;
  }

  /**
   *
   * @param {String} name
   */
  changeNameDefaultLayer(name) {
    this.keyboard.defaultLayer.changeName(name);
    this.changingNameLayer = false;
  }

  /**
   *
   * @param {number} i
   * @param {String} name
   */
  changeNameLayer(i, name) {
    this.keyboard.additionalLayers[i].changeName(name);
    this.changingNameLayer = false;
  }

  cancelChangeNameLayer() {
    this.changingNameLayer = false;
  }

  /**
   *
   * @param {KeyId} id
   * @returns
   */
  getKeyLayout(id) {
    return this.keyboard.getKeyLayout(this.selectedLayer, id);
  }

  getSelectedKeyLayout() {
    const selectedKey = this.getSelectedKey();
    if (selectedKey === null) {
      console.warn(this.selectedKeys);
      return null;
    }
    return this.keyboard.getKeyLayout(this.selectedLayer, selectedKey);
  }

  getSelectedKey() {
    if (this.selectedKeys.length == 1) {
      return this.selectedKeys[0];
    }
    return null;
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
      const newKey = this.keyboard.addKey(
        x,
        y,
        this.toolWidth,
        this.toolHeight,
        this.toolRotation,
      );
      this.selectedKeys = [newKey];
    } else if (this.selectedTool == TOOL.Move) {
      this.selectedKeys = [];
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
    // needed, otherwise the svg will think we clicked outside
    evt.stopPropagation();
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
    const x = Math.round(geo.x0() + trans.x);
    const y = Math.round(geo.y0() + trans.y);
    return {
      trans: this.getTranslation(key_id),
      x: x,
      y: y,
      centerX: x + geo.width / 2,
      centerY: y + geo.height / 2,
      width: geo.width,
      height: geo.height,
      rotation: geo.rotation,
      layout: this.getKeyLayout(key_id),
    };
  }

  /**
   *
   * @param {KeyId} key_id
   * @returns
   */
  keySvgPath(key_id) {
    const cornerRadius = 10;
    const geo = this.getKeyGeometry(key_id);
    const width = geo.width;
    const height = geo.height;
    const trans = this.getTranslation(key_id);
    const x = geo.x0() + trans.x;
    const y = geo.y0() + trans.y;
    return `
    M${x + cornerRadius},${y}
    h${width - 2 * cornerRadius}
    q${cornerRadius},0 ${cornerRadius},${cornerRadius}
    v${height - 2 * cornerRadius}
    q0,${cornerRadius} -${cornerRadius},${cornerRadius}
    h-${width - 2 * cornerRadius}
    q-${cornerRadius},0 -${cornerRadius},-${cornerRadius}
    v-${height - 2 * cornerRadius}
    q0,-${cornerRadius} ${cornerRadius},-${cornerRadius} z`;
  }

  selectedKeyView() {
    if (this.selectedKeys.length != 1) {
      return null;
    }
    const key = this.selectedKeys[0];
    return this.keyView(key);
  }

  /**
   *
   * @param {number} width
   */
  updateWidth(width) {
    this.toolWidth = width;
    this.keyboard.geometries.get(this.selectedKeys[0]).width = width;
  }

  /**
   *
   *
   * @param {number} height
   */
  updateHeight(height) {
    this.toolHeight = height;
    this.keyboard.geometries.get(this.selectedKeys[0]).height = height;
  }

  /**
   *
   *
   * @param {number} rotation
   */
  updateRotation(rotation) {
    this.toolRotation = rotation;
    this.keyboard.geometries.get(this.selectedKeys[0]).rotation = rotation;
  }

  sayHello() {
    console.log("hello");
  }

  request_template() {}
}

export default App;
