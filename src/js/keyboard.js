import KeyGeometry, { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./geometry.js";
import KeyId from "./key.js";
import Layer from "./layer.js";
import KeyLayout, { KeyCode } from "./key_layout.js";
import Vec2D from "./vec.js";

import { reviver } from "./importFunc.js";
import KeyIdMap from "./keymap.js";

class Keyboard {
  /**
   * Creates a new Keyboard instance
   * @param {string} [name="New keyboard"] - The name of the keyboard
   */
  constructor(name = "New keyboard") {
    /** @type {string} */
    this.name = name;

    /** @type {Array<KeyId>} */
    this.keys = [];

    /** @type {KeyIdMap<KeyGeometry>} */
    this.geometries = new KeyIdMap();

    /** @type {Layer} */
    this.defaultLayer = new Layer();

    /** @type {Array<Layer>} */
    this.additionalLayers = [];
  }

  /**
   *
   * @param {any} data
   * @returns
   */
  static parseJson(data) {
    const keyboard = new Keyboard();

    keyboard.name = data.name;
    keyboard.keys = data.keys.map(KeyId.fromJson);
    keyboard.geometries =
      reviver(data.geometries, KeyGeometry.fromJson) ?? new KeyIdMap();

    keyboard.defaultLayer = Layer.fromJson(data.defaultLayer);
    keyboard.additionalLayers = data.additionalLayers.map(Layer.fromJson);

    // assign other properties as needed
    return keyboard;
  }

  /**
   *
   * @param {number} posX
   * @param {number} posY
   * @returns
   */
  addKey(
    posX,
    posY,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    rotation = 0,
  ) {
    const key = new KeyId();
    this.keys.push(key);
    this.geometries.set(
      key,
      new KeyGeometry(new Vec2D(posX, posY), width, height, rotation),
    );

    return key; //TOCHECK
  }

  /**
   *
   * @param {KeyId[]} ids
   */
  supprKey(ids) {
    /*
    This function removes the keys from the keyboard.
    */

    let idSet = new Set(ids); // to decrease the complexity
    this.keys = this.keys.filter((key) => !idSet.has(key));

    for (let key of idSet) {
      this.geometries.delete(key);
    }

    for (let layer of this.additionalLayers) {
      layer.activation = layer.activation.filter((x) => !idSet.has(x));
    }
  }

  getKeys() {
    return this.keys;
  }

  /**
   *
   * @param {number} i_layer
   * @returns {Layer}
   */
  getLayer(i_layer) {
    if (i_layer === -1) {
      return this.defaultLayer;
    }
    const layer = this.additionalLayers[i_layer];
    if (!layer) {
      throw new Error("layer is not defined");
    }
    return layer;
  }

  /**
   *
   * @param {number} i_layer
   * @param {KeyId} key_id
   * @returns {KeyLayout}
   */
  getKeyLayout(i_layer, key_id) {
    const layer = this.getLayer(i_layer);
    const layout = layer.keyMap.get(key_id);
    return layout || new KeyLayout();
  }

  /**
   *
   * @param {number} i_layer
   * @param {KeyId} key_id
   * @param {string} value
   */
  setKeyLayout(i_layer, key_id, value) {
    let layout = this.getKeyLayout(i_layer, key_id);
    layout.keycodes = [new KeyCode(value)];
    this.getLayer(i_layer).keyMap.set(key_id, layout);
  }

  /**
   *
   * @param {number} i_layer
   * @param {KeyId} key_id
   * @param {string} value
   */
  addKeyLayout(i_layer, key_id, value) {
    let layout = this.getKeyLayout(i_layer, key_id);
    if (layout.keycodes.length === 0) {
      this.setKeyLayout(i_layer, key_id, value);
    } else {
      layout.keycodes.push(new KeyCode(value));
    }
  }

  /**
   *
   * @param {number} i_layer
   * @param {KeyId} key_id
   * @param {string} value
   */
  supprKeyLayout(i_layer, key_id, value) {
    let layout = this.getKeyLayout(i_layer, key_id);

    const index = layout.keycodes.findIndex(
      (keyCode) => keyCode.toString() == value,
    );
    if (index !== -1) {
      layout.keycodes.splice(index, 1); // Remove the element at the found index
    }
  }
}

export default Keyboard;
