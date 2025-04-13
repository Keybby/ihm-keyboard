class KeyId {
  static counter = 0;
  // corresponds to a physical key (placement on the board)
  constructor() {
    this.value = KeyId.counter++; // Create a new unique ID using counter
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
