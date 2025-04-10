// import SPECIAL_KEYCODES from "./special_keys.js";

const BEHAVIOUR = {
  // normal keys : letters, numbers, symbols, ...
  Classic: 0,
  // keys that are used in combination with others, ex : CTTRL+aLT
  Combo: 1,
  //keys that need to keep being pressed to have an effect 
  // on the keyboard, ex : Shift
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
    // returns the result of the key code from a key
    if (typeof this.code === "number") {
      // if the keycode is a number, we have a special key such as F12
      return `special key ${this.code}`;
    }
    // otherwise, the keyboard key is a character
    return this.code.toString();
  }
}

class KeyLayout {

  /*
  This class represents the layout of the keys on the keyboard created by the user.

  Attributes : 
  - behaviour : the behaviour of the key (Classic, Combo, Sticky)
  - keycodes : the keycodes of the keys on the keyboard
  */
  /**
   *
   * @param {Number} behaviour
   * @param {Array<KeyCode>} keycodes
      if behaviour is Undefined, keycodes is []
   */
  constructor(behaviour = BEHAVIOUR.Classic, keycodes = []) {
    this.behaviour = behaviour;
    this.keycodes = keycodes;
  }
}

export default KeyLayout;
export { BEHAVIOUR, KeyCode };
