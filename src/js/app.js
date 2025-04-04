import Keyboard from "/js/keyboard.js";
import KeyId from "/js/key.js";

const SELECT_TOOL = {
  Move: 0,
};

class App {
  constructor() {
    this.keyboard = new Keyboard();
    this.selectedTool = SELECT_TOOL.Move;
    // index of the layer in the array
    // if -1, it is the default layer
    this.selectedLayer = -1;
    this.svg = document.getElementById("main");
  }

  getKeyLayout(id) {
    return this.keyboard.getKeyLayout(this.selectedLayer, id);
  }

  handleClick(evt) {
    const CTM = this.svg.getScreenCTM();
    const x = (evt.clientX - CTM.e) / CTM.a;
    const y = (evt.clientY - CTM.f) / CTM.d;
    this.keyboard.addKey(x, y);
  }

  sayHello() {
    console.log("hello");
  }

  request_template() {}
}

export default App;
window.App = App;
