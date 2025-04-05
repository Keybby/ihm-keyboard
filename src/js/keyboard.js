import Layer from "./layer.js";
import KeyGeometry from "./geometry.js";
import KeyId from "./key.js";

class Keyboard {
  /**
   *
   * @param {Stiring} name
     @param {Array<KeyId>} keys
     @param {Record<KeyId, KeyGeometry>} geometries
     @param {Layer} defaultLayer
   * @param {Array<Layer>} additionalLayers
   */
  constructor(name = "New keyboard") {
    this.name = name;
    this.keys = [];
    this.geometries = {};
    this.defaultLayer = new Layer();
    this.additionalLayers = [];
  }

  addKey(posX, posY) {
    const key = new KeyId();
    this.keys.push(key);
    this.geometries[key] = new KeyGeometry(posX, posY);
  }

  getKeys() {
    return this.keys;
  }

  getLayer(i_layer) {
    if (i_layer === -1) {
      return this.defaultLayer;
    }
    return this.additionalLayers[i_layer];
  }

  getKeyLayout(i_layer, id_key) {
    const layer = this.getLayer(i_layer);
    return layer && layer.keyMap[id_key] ? layer.keyMap[id_key] : null;
  }
}

export default Keyboard;
