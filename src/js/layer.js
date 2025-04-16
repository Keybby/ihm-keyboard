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
  constructor(name = "default", activation = [], keyMap = new KeyIdMap()) {
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
      obj.activation.map(KeyId.fromJson),
      reviver(obj.keyMap, KeyLayout.fromJson) ?? new KeyIdMap()
    );
  }

  /**
   *
   * @param {String} name
   */
  changeName(name) {
    this.name = name;
  }

  /**
   * 
   * @param {KeyId} key_id 
   * @returns 
   */
  isActivation(key_id){
    return this.activation.some(k => k.value === key_id.value);
  }
}

export default Layer;
