class Keyboard {
  constructor(name) {
    this.name = name;
    this.keys = [];
    this.n_keys = 0;
  }
  addKey() {
    this.keys.push({
      id: this.n_keys,
      label: String.fromCharCode(50 + this.n_keys),
      x: 100 + 100 * this.n_keys,
      y: 100,
    });
    this.n_keys += 1;
  }
  clear() {
    this.keys = [];
  }
  getKeys() {
    return this.keys;
  }
}
class App {
  constructor() {
    this.keyboard = new Keyboard();
  }
}
window.App = App;
