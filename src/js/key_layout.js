import SPECIAL_KEYCODES from "./special_keys.js";

const BEHAVIOUR = {
  Undefined: -1,
  Classic: 0,
  Combo: 1,
  Sticky: 2,
};

class KeyCode {
  /**
   * @param {Number|string} code
   if code is a number, this is a special key (like F12)
   if code is a string, this is char key (like 'A')
   */
  constructor(code) {
    this.code = code;
  }
  toString() {
    if (typeof this.code === "number") {
      return `special key ${this.code}`;
    }
    return this.code.toString();
  }
}

class KeyLayout {
  /**
   *
   * @param {Number} behaviour
   * @param {Array<KeyCode>} keycodes
      if behaviour is Undefined, keycodes is []
   */
  constructor(behaviour = BEHAVIOUR.Undefined, keycodes = []) {
    this.behaviour = behaviour;
    this.keycode = keycodes;
  }
}

export default KeyLayout;
