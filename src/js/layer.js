import KeyId from "./key.js";
import KeyLayout from "./key_layout.js";

class Layer {
  /**
    @param name {String}
      the set of keys that must be clicked to activate this layer
    @param keyMap {Map<KeyId, KeyLayout>} is a record from KeyId to Key
  */
  constructor(name = "default", keyMap = new Map()) {
    this.name = name;
    this.keyMap = keyMap;
  }
}

export default Layer;
