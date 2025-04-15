import KeyId from "./key.js";

/**
 * A Map-like structure that uses the `.value` property of keys (e.g., instances of KeyId)
 * for internal storage. This allows comparing keys by value, not by reference.
 *
 * @template V - The value type stored in the map.
 */
class ValueMap {
  constructor() {
    /** @type {Map<number, V>} */
    this._map = new Map();
  }

  /**
   * @param {KeyId} key
   * @param {V} value
   */
  set(key, value) {
    this._map.set(key.value, value);
  }

  /**
   * @param {KeyId} key
   * @returns {V | undefined}
   */
  get(key) {
    return this._map.get(key.value);
  }

  /**
   * @param {KeyId} key
   * @returns {boolean}
   */
  has(key) {
    return this._map.has(key.value);
  }

  /**
   * @param {KeyId} key
   * @returns {boolean}
   */
  delete(key) {
    return this._map.delete(key.value);
  }

  clear() {
    this._map.clear();
  }

  get size() {
    return this._map.size;
  }

  /**
   * @param {(value: V, key: KeyId, map: ValueMap<V>) => void} callback
   */
  forEach(callback) {
    for (const [keyValue, val] of this._map.entries()) {
      const key = KeyId.fromJson({ value: keyValue }); // ✅ FIX HERE
      callback(val, key, this);
    }
  }

  /**
   * @returns {Array<[KeyId, V]>}
   */
  entries() {
    return Array.from(this._map.entries()).map(
      ([k, v]) => [KeyId.fromJson({ value: k }), v] // ✅ FIX HERE
    );
  }

  /**
   * @returns {Array<KeyId>}
   */
  keys() {
    return Array.from(this._map.keys()).map(
      k => KeyId.fromJson({ value: k }) // ✅ FIX HERE
    );
  }

  /**
   * @returns {Iterable<V>}
   */
  values() {
    return this._map.values();
  }

  /**
   * @returns {IterableIterator<[KeyId, V]>}
   */
  [Symbol.iterator]() {
    return this.entries()[Symbol.iterator]();
  }
}

export default ValueMap;
