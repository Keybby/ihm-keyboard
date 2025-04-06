import Layer from "./layer.js";
import KeyGeometry from "./geometry.js";
import KeyId from "./key.js";

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

    /** @type {Map<KeyId, KeyGeometry>} */
    this.geometries = new Map();

    /** @type {Layer} */
    this.defaultLayer = new Layer();

    /** @type {Array<Layer>} */
    this.additionalLayers = [];
  }
  /**
   *
   * @param {number} posX
   * @param {number} posY
   * @returns
   */
  addKey(posX, posY) {
    const key = new KeyId();
    this.keys.push(key);
    this.geometries.set(key, new KeyGeometry(posX, posY));

    return key; //TOCHECK
  }

  getKeys() {
    return this.keys;
  }

  /**
   *
   * @param {number} i_layer
   * @returns
   */
  getLayer(i_layer) {
    if (i_layer === -1) {
      return this.defaultLayer;
    }
    return this.additionalLayers[i_layer];
  }

  /**
   *
   * @param {number} i_layer
   * @param {KeyId} key_id
   * @returns
   */
  getKeyLayout(i_layer, key_id) {
    const layer = this.getLayer(i_layer);
    return layer && layer.keyMap.has(key_id) ? layer.keyMap.has(key_id) : null;
  }
}

export default Keyboard;
