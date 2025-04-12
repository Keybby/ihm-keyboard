import KeyId from "./key.js";
import KeyLayout from "./key_layout.js";

class Layer {
  /**
    @param {String} name 
      the set of keys that must be clicked to activate this layer
    @param {Map<KeyId, KeyLayout>} keyMap  is a record from KeyId to Key
  */
  constructor(name = "default", keyMap = new Map()) {
    this.name = name;
    this.keyMap = keyMap;
  }

  /**
   * 
   * @param {String} name 
   */
  changeName(name){
    this.name = name;
  }
}

export default Layer;
