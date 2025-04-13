import Keyboard from "./keyboard.js";
import Ui from "./ui.js";
import Layer from "./layer.js";
import KeyId from "./key.js";
import Popup from "./popup.js";
import KeyGeometry, { DEFAULT_WIDTH, DEFAULT_HEIGHT } from "./geometry.js";
import { KeyCode } from "./key_layout.js";
import exportFunction from "./exportFunc.js";
import { isRotatedRectColliding } from "./collision.js";
import { Vec2D, ZERO } from "./vec.js";

const TOOL = {
  Move: 0,
  Create: 1,
};

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

  /** @type {Boolean} */
  // indicates if we are in the process of selecting keyse
  hasRectangleSelection;

  /** @type {*}
   * Contains width, height and rotation for each key selected */
  initialGeometries;

  /** @type {SVGSVGElement} */
  svg;

  /** @type {Vec2D| null} */
  lastClicked;

  /** @type {Vec2D | null} */
  lastMoved;

  /** @type {KeyId[]} */
  selectedKeys;

  /** @type {Ui} */
  ui;

  /** @type {Popup} */
  popup;

  constructor() {
    // will contain the keyboard layout
    this.keyboard = new Keyboard();
    // By default move is selected
    this.selectedTool = TOOL.Move;
    this.selectedLayer = -1;
    this.changingNameLayer = false;
    // @ts-ignore
    this.svg = document.getElementById("main");
    this.lastClicked = null;
    this.lastMoved = null;
    this.selectedKeys = [];
    // represents the canvas where we'll draw the keyboard
    this.ui = new Ui();
    // basic pop up that will be adapted according to which button
    // is clicked
    this.popup = new Popup();

    // default values for the tools
    this.toolWidth = DEFAULT_WIDTH;
    this.toolHeight = DEFAULT_HEIGHT;
    this.toolRotation = 0;

    this.hasRectangleSelection = false;
    this.initialGeometries = [];
  }

  setModeMove() {
    // Selection of the move button
    this.selectedTool = TOOL.Move;
  }
  setModeCreate() {
    // Selection of the button to create keys
    this.selectedTool = TOOL.Create;
  }

  // the two following functions are used to check which button is selected

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

  /**
   *
   * @param {number} i
   * @returns {String}
   */
  getLayerActivation(i) {
    return this.keyboard.getActivation(i);
  }

  additionalLayers() {
    // gets all the layers previously created
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
    // select the layer the user clicked on
    this.selectedLayer = i;
  }

  /**
   *
   * @param {number} i
   * @returns
   */
  isActiveLayer(i) {
    // check if the current layer displayed is the layer i
    return i == this.selectedLayer;
  }

  isActiveLayerDefault() {
    return this.selectedLayer == -1;
  }

  addLayer() {
    // when we add a layer, we create an instance of the layer class
    // and we push it to the array of additional layers
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
    // checks if we are changing the name of the default layer
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
    // changes the name of layer i according to the name given by the user
    this.keyboard.getLayer(i).changeName(name);
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
    // gets the layout of the key that was selected by the user
    return this.keyboard.getKeyLayout(this.selectedLayer, id);
  }

  /**
   * @param {KeyId} id
   * @param {string} value
   */
  setKeyLayout(id, value) {
    if (id == null) {
      const keyCode = new KeyCode(value);
      this.keyboard.additionalActivation.push(keyCode);
    }
    // sets the character of keycode associated with the selected key
    this.keyboard.setKeyLayout(this.selectedLayer, id, value);
  }

  /**
   * @param {KeyId} id
   * @param {string} value
   */
  addKeyLayout(id, value) {
    // sets the character of keycode associated with the selected key
    if (id == null) {
      this.addActivation(value);
      return;
    }

    if (value == "") {
      return;
    }
    // @ts-ignore
    document.getElementById("key_add_code").value = "";
    this.keyboard.addKeyLayout(this.selectedLayer, id, value);
  }

  /**
   * @param {string} value
   */
  addActivation(value) {
    const keyCode = new KeyCode(value);
    this.keyboard.additionalActivation.push(keyCode);
  }

  /**
   * @param {KeyId} id
   * @param {string} value
   */
  supprKeyLayout(id, value) {
    // sets the character of keycode associated with the selected key
    this.keyboard.supprKeyLayout(this.selectedLayer, id, value);
  }

  getSelectedKeyLayout() {
    // gets the layout of the key that was selected by the user
    const selectedKey = this.getSelectedKey();
    if (!selectedKey) {
      console.warn(this.selectedKeys);
      return null;
    }
    return this.keyboard.getKeyLayout(this.selectedLayer, selectedKey);
  }

  getSelectedKey() {
    // gets the key object representing the key selected by the user
    if (this.selectedKeys.length == 1) {
      return this.selectedKeys[0];
    }
    return null;
  }

  /**
   *
   * @param {KeyId} key_id
   * @returns {boolean}
   */
  isSelected(key_id) {
    return this.selectedKeys.includes(key_id);
  }

  /**
   *
   * @param {MouseEvent} evt
   */
  handleMouseDown(evt) {
    // we get the coordinates of the mouse when the user clicks on the canvas
    const { x, y } = this.getMouseCoordinates(evt);
    const pos = this.getMouseCoordinates(evt);
    this.lastClicked = pos;
    this.lastMoved = pos;
    if (this.selectedTool == TOOL.Create) {
      // if the tool is create, we create a new key at the position of the mouse
      const newKey = this.keyboard.addKey(
        x,
        y,
        this.toolWidth,
        this.toolHeight,
        this.toolRotation,
      );
      this.selectedKeys = [newKey];
    } else if (this.selectedTool == TOOL.Move) {
      // if the tool is move and the user holds the mouse dow<n
      // then the user can make a rectangle selction of the keys
      // ie, all the keys in the rectangle will be selected and
      // could be moved by the user
      this.hasRectangleSelection = true;
      this.selectedKeys = [];
      this.initialGeometries = [];
    }
  }

  /**
   *
   * @param {MouseEvent} evt
   * @param {KeyId} key_id
   */
  handleMouseDownOnKey(evt, key_id) {
    // if the user clicks on a precise key, we select it
    if (!this.isSelected(key_id)) {
      this.selectedKeys = [key_id];
    }
    const pos = this.getMouseCoordinates(evt);
    this.lastClicked = pos;
    this.lastMoved = pos;
    // needed, otherwise the svg will think we clicked outside
    evt.stopPropagation();
  }

  /**
   *
   * @param {KeyId} key_id
   * @param {KeyId} other_id
   * @param {Vec2D} translation
   * @returns
   */
  detectCollision(key_id, other_id, translation) {
    // checks if moving the key(s) created a collision
    const key_geometry = this.getKeyGeometry(key_id);
    const other_geometry = this.getKeyGeometry(other_id);

    if (!isRotatedRectColliding(key_geometry, other_geometry, translation)) {
      return false;
    }
    return true;
  }

  rawTranslation() {
    // this function returns the translation vector
    // that is the difference between the last position of the mouse and the first one
    if (!this.lastMoved || !this.lastClicked) {
      return ZERO;
    }
    return new Vec2D(
      this.lastMoved.x - this.lastClicked.x,
      this.lastMoved.y - this.lastClicked.y,
    );
  }

  handleMouseUp() {
    if (this.selectedTool == TOOL.Move) {
      // if we have mouse up when we were moving keys
      // this means the user has finished their rectangle selection
      const translation = this.getTranslation();
      for (const key_id of this.selectedKeys) {
        const geometry = this.keyboard.geometries.get(key_id);
        geometry?.translate(translation);
      }
    }
    //this.selectedKeys = [];
    this.lastClicked = null;
    this.lastMoved = null;
    this.hasRectangleSelection = false;
  }

  supprKey() {
    // this function deletes a key
    if (this.selectedKeys.length > 0) {
      this.keyboard.supprKey(this.selectedKeys);

      this.selectedKeys = [];
      this.lastClicked = null;
      this.lastMoved = null;
      this.hasRectangleSelection = false;
      this.initialGeometries = [];
    }
  }

  /**
   *
   * @param {MouseEvent} evt
   */
  handleMouseMove(evt) {
    this.lastMoved = this.getMouseCoordinates(evt);
    if (this.hasRectangleSelection) {
      const selection = this.getRectangleSelection();
      for (const key_id of this.keyboard.getKeys()) {
        const geo = this.getKeyGeometry(key_id);
        if (!geo) {
          return;
        }
        if (selection) {
          if (
            geo.center.x >= selection.x0 &&
            geo.center.x <= selection.x1 &&
            geo.center.y >= selection.y0 &&
            geo.center.y <= selection.y1
          ) {
            if (!this.isSelected(key_id)) {
              this.selectedKeys.push(key_id);

              const geoInit = {
                width: geo.width,
                height: geo.height,
                rotation: geo.rotation,
              };
              this.initialGeometries.push(geoInit);
            }
          }
        }
      }
    }
  }

  getRectangleSelection() {
    // returns the coordinates of the rectangle selection
    if (!this.hasRectangleSelection) {
      return null;
    }
    if (!this.lastClicked || !this.lastMoved) {
      throw new Error("lastClicked and lastMoved should not be null");
    }

    return {
      x0: Math.min(this.lastClicked.x, this.lastMoved.x),
      y0: Math.min(this.lastClicked.y, this.lastMoved.y),
      x1: Math.max(this.lastClicked.x, this.lastMoved.x),
      y1: Math.max(this.lastClicked.y, this.lastMoved.y),
    };
  }

  /**
   *
   * @param {KeyId} key_id
   * @returns {KeyGeometry}
   */
  getKeyGeometry(key_id) {
    const geometry = this.keyboard.geometries.get(key_id);
    if (!geometry) {
      throw new Error(`Key geometry not found for key_id: ${key_id}`);
    }
    return geometry;
  }

  /**
   *
   * @param {Vec2D} original_translation
   * @param {Vec2D} last_moved
   */
  resolveTranslationCollisions(original_translation, last_moved) {
    // this function evaluates if moving a key is possible
    // along the original_translation vector
    // if it is not possible, we try to move the key
    // the closest as we can to the position indicated by the user
    let translation = original_translation;
    for (let i = 0; i < 500; i++) {
      let colide = false;
      for (const id_a of this.selectedKeys) {
        for (const id_b of this.keyboard.keys) {
          const geo_b = this.getKeyGeometry(id_b);
          if (id_a != id_b && !this.isSelected(id_b)) {
            if (this.detectCollision(id_a, id_b, translation)) {
              colide = true;
              const dir = last_moved.minus(geo_b.center).normalize();
              translation = translation.plus(dir);
            }
          }
        }
      }
      if (!colide) {
        return translation;
      }
    }
    return ZERO;
  }

  /**
   *
   * @param {KeyId} key_id
   * @returns
   */
  getNearestNonSelectedKeys(key_id) {
    const nonSelectedKeys = [];
    const geo_key = this.getKeyGeometry(key_id);
    for (const id_b of this.keyboard.keys) {
      if (id_b != key_id && !this.isSelected(id_b)) {
        nonSelectedKeys.push(id_b);
      }
    }
    nonSelectedKeys.sort((a, b) => {
      const geo_a = this.getKeyGeometry(a);
      const geo_b = this.getKeyGeometry(b);
      const dist_a = geo_a.center.minus(geo_key.center).norm();
      const dist_b = geo_b.center.minus(geo_key.center).norm();
      return dist_a - dist_b;
    });
    return nonSelectedKeys;
  }

  /**
   *
   * @param {Vec2D} pos
   * @returns
   */
  getNearestSelectedKeysFromMousePosition(pos) {
    this.selectedKeys.sort((a, b) => {
      const geo_a = this.getKeyGeometry(a);
      const geo_b = this.getKeyGeometry(b);
      const dist_a = geo_a.center.minus(pos).norm();
      const dist_b = geo_b.center.minus(pos).norm();
      return dist_a - dist_b;
    });
    return this.selectedKeys;
  }

  /**
   *
   * @param {Vec2D} original_translation
   * @param {Vec2D} mouse_position
   * @param {'x'|'y'} mode

   */
  resolveTranslationSnap(original_translation, mouse_position, mode) {
    for (const id_a of this.getNearestSelectedKeysFromMousePosition(
      mouse_position,
    )) {
      const current_pos =
        this.getKeyGeometry(id_a).center.plus(original_translation);
      for (const id_b of this.getNearestNonSelectedKeys(id_a)) {
        const geo_b = this.getKeyGeometry(id_b);
        const v = geo_b.center.minus(current_pos);
        const up =
          mode == "x"
            ? geo_b.getVectorUp().normalize()
            : geo_b.getVectorRight().normalize();
        if (Math.abs(v.dot(up)) < 20) {
          return original_translation.plus(up.scaled(v.dot(up)));
        }
      }
    }
    return original_translation;
  }

  /**

  This function handles the entire mouse movement logic.
  At any moment, the app has a list of selected keys, which the user may be moving.
  If he is indeed moving the keys (keys are selected, he clicked once, he is dragging, and is not in rectangle selection mode),
  we have to decide where the selected keys must be placed.
  We first resolve the collisions, then check if there is snapping, and check a last time for collisions (the snap may have created new collisions)
   *
   * @returns {Vec2D}
   */
  getTranslation() {
    if (this.lastClicked && this.lastMoved && !this.hasRectangleSelection) {
      let translation = this.resolveTranslationCollisions(
        this.rawTranslation(),
        this.lastMoved,
      );
      translation = this.resolveTranslationSnap(
        translation,
        this.lastMoved,
        "x",
      );
      translation = this.resolveTranslationSnap(
        translation,
        this.lastMoved,
        "y",
      );
      translation = this.resolveTranslationCollisions(
        translation,
        this.lastMoved,
      );
      return translation;
    }
    return ZERO;
  }

  /**
   *
   * @param {MouseEvent} evt
   * @returns {Vec2D}
   */
  getMouseCoordinates(evt) {
    // gets the mouse coordinates on the svg
    const CTM = this.svg.getScreenCTM();
    if (!CTM) {
      throw new Error("svg has no CTM");
    }
    const x = (evt.clientX - CTM.e) / CTM.a;
    const y = (evt.clientY - CTM.f) / CTM.d;
    return new Vec2D(x, y);
  }

  /**
   *
   * @param {KeyId} key_id
   */
  keyView(key_id) {
    // returns the relevant parameters to draw the key
    // on the svg canvas
    const geo = this.getKeyGeometry(key_id);
    if (!geo) {
      throw new Error("Key geometry not found");
    }
    const trans = this.isSelected(key_id) ? this.getTranslation() : ZERO;
    const x = Math.round(geo.x0() + trans.x);
    const y = Math.round(geo.y0() + trans.y);
    return {
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
   * @returns
   */
  keysChange() {
    // returns the new representation of the key selected
    // as has been indicated by the user on the right side menu
    const key_id = this.selectedKeys[0];
    if (!key_id) {
      throw new Error("Key ID not found");
    }
    const geo = this.getKeyGeometry(key_id);
    if (!geo) {
      throw new Error("Key geometry not found");
    }

    return {
      widthChange: (geo.width / this.initialGeometries[0].width) * 100,
      heightChange: (geo.height / this.initialGeometries[0].height) * 100,
      rotationChange: geo.rotation - this.initialGeometries[0].rotation,
    };
  }

  /**
   *
   * @param {KeyId} key_id
   * @returns
   */
  keySvgPath(key_id) {
    // dynamically create the svg key based on the parameters of the key
    const cornerRadius = 10;
    const { x, y, width, height } = this.keyView(key_id);
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

  nbSelectedKeys() {
    return this.selectedKeys.length;
  }

  selectedKeyView() {
    if (this.nbSelectedKeys() < 1) {
      return null;
    } else if (this.nbSelectedKeys() === 1) {
      const key = this.getSelectedKey();
      if (!key) {
        return null;
      }
      return this.keyView(key);
    } else {
      return this.keysChange();
    }
  }

  /**
   *
   * @param {number} width
   */
  updateWidth(width) {
    // updates dynamically the width of the key
    this.toolWidth = width;
    for (const key_id of this.selectedKeys) {
      const geometry = this.getKeyGeometry(key_id);
      geometry.width = width;
    }
  }

  /**
   *
   * @param {number} widthChange
   */
  updateWidthChange(widthChange) {
    // updates the width of the keys selected
    for (let i = 0; i < this.nbSelectedKeys(); i++) {
      const key_id = this.selectedKeys[i];
      if (!key_id) {
        throw new Error("Key ID not found");
      }

      const geometryInit = this.initialGeometries[i];
      const geometrytoChange = this.getKeyGeometry(key_id);

      if (!geometryInit || !geometrytoChange) {
        console.log(this.initialGeometries.length);
        throw new Error("Key geometry not found");
      }

      geometrytoChange.width = geometryInit.width * (widthChange / 100);
    }
  }

  /**
   *
   *
   * @param {number} height
   */
  updateHeight(height) {
    // updates dynamically the height of the key
    this.toolHeight = height;
    for (const key_id of this.selectedKeys) {
      const geometry = this.getKeyGeometry(key_id);
      geometry.height = height;
    }
  }

  /**
   *
   * @param {number} heightChange
   */
  updateHeightChange(heightChange) {
    // updates the height of the keys selected
    for (let i = 0; i < this.nbSelectedKeys(); i++) {
      const key_id = this.selectedKeys[i];
      if (!key_id) {
        throw new Error("Key ID not found");
      }

      const geometryInit = this.initialGeometries[i];
      const geometrytoChange = this.getKeyGeometry(key_id);

      if (!geometryInit || !geometrytoChange) {
        console.log(this.initialGeometries.length);
        throw new Error("Key geometry not found");
      }

      geometrytoChange.height = geometryInit.height * (heightChange / 100);
    }
  }

  /**
   *
   *
   * @param {number} rotation
   */
  updateRotation(rotation) {
    // updates the rotation of the key selected currently
    this.toolRotation = rotation;
    for (const key_id of this.selectedKeys) {
      const geometry = this.getKeyGeometry(key_id);
      geometry.rotation = rotation;
    }
  }

  /**
   *
   * @param {String} rotationChange
   */
  updateRotationChange(rotationChange) {
    // updates the rotation of the keys selected according to the rotation indicated by the user
    for (let i = 0; i < this.nbSelectedKeys(); i++) {
      const key_id = this.selectedKeys[i];
      if (!key_id) {
        throw new Error("Key ID not found");
      }

      const geometryInit = this.initialGeometries[i];
      const geometrytoChange = this.getKeyGeometry(key_id);

      if (!geometryInit || !geometrytoChange) {
        console.log(this.initialGeometries.length);
        throw new Error("Key geometry not found");
      }

      geometrytoChange.rotation =
        parseInt(geometryInit.rotation) + parseInt(rotationChange);
    }
  }

  /**
   *
   * @param {*} value
   */
  printValue(value) {
    console.log(value);
  }

  request_template() {}

  /**
   *
   * @param {string} name
   */
  importFromPremade(name) {
    // this function imports a premade keyboard from the assets folder
    let file;
    let req = new XMLHttpRequest();
    req.open("GET", `assets/keyboard/${name}.json`, false);
    req.send();
    file = JSON.parse(req.responseText);
    this.import(file);
  }

  importFromFile() {
    let json;
    //TODO
    this.popup.done(); // Si accepté; on ferme la popup
    this.import(json);
  }

  /**
   *
   * @param {any} json
   */
  import(json) {
    //TODO
  }
  exportFile() {
    // function called when the user clicks on the export button in the popup
    exportFunction(this.keyboard);
  }
}

export default App;
