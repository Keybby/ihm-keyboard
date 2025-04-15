class KeyId {
  static counter = 0;
  // corresponds to a physical key (placement on the board)
  constructor() {
    this.value = KeyId.counter++; // Create a new unique ID using counter
  }

  /**
   * 
   * @param {any} obj 
   * @returns 
   */
  static fromJson(obj) {
    const instance = new KeyId();
    instance.value = obj.value;

    // Optionally update the counter to avoid collisions
    if (obj.value >= KeyId.counter) {
      KeyId.counter = obj.value + 1;
    }

    return instance;
  }

  // Add methods to make it work well with Sets
  valueOf() {
    return this.value;
  }

  toString() {
    return this.value.toString();
  }

  [Symbol.toPrimitive]() {
    return this.value;
  }
}

export default KeyId;
