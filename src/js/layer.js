import KeyId from "/js/key.js";
import KeyLayout from "/js/key_layout.js";

class Layer {
  /**
    @param name {String}
      the set of keys that must be clicked to activate this layer
    @param keyMap {Record<KeyId, KeyLayout>} is a record from KeyId to Key
  */
  constructor(name = "default", keyMap = {}) {
    this.name = name;
    this.keyMap = keyMap;
  }
}

export default Layer;
