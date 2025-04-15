import KeyId from "./key.js";
import KeyLayout from "./key_layout.js";

import {reviver} from "./importFunc.js";
import KeyIdMap from "./keymap.js";

class Layer {
  /**
    @param {String} name
    @param {KeyId[]} activation
      the set of keys that must be clicked to activate this layer
    @param {KeyIdMap<KeyLayout>} keyMap  is a record from KeyId to Key
  */
  constructor(name = "default", keyMap = new KeyIdMap(), activation = []) {
    this.name = name;
    this.keyMap = keyMap;
    this.activation = activation;
  }

  /**
   * 
   * @param {any} obj 
   * @returns 
   */
  static fromJson(obj){
    return new Layer(
      obj.name,
      reviver(obj.keyMap, KeyLayout.fromJson) ?? new KeyIdMap(),
      obj.activation.map(KeyId.fromJson)
    );
  }

  /**
   *
   * @param {String} name
   */
  changeName(name) {
    this.name = name;
  }
}

export default Layer;
