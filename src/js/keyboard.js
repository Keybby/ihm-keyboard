import KeyGeometry, { DEFAULT_HEIGHT, DEFAULT_WIDTH } from "./geometry.js";
import KeyId from "./key.js";
import Layer from "./layer.js";
import KeyLayout from "./key_layout.js";

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
      new KeyGeometry(posX, posY, width, height, rotation),
    );

    return key; //TOCHECK
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
}

export default Keyboard;
