import KeyGeometry from "/js/geometry.js";
import KeyLayout from "/js/key_layout.js";

class KeyId {
  // corresponds to a physical key (placement on the board)
  constructor() {
    this.value = Date.now(); // Create a new unique ID based on current timestamp
  }
  // Add methods to make it work well with Sets
  valueOf() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }
}

export default KeyId;
