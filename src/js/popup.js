class Popup {
  constructor() {
    this.title = document.getElementById("popup_title");
    this.refX = 0;
    this.refY = 0;
    this.x = 0;
    this.y = 0;
    this.offX = 0;
    this.offY = 0;
    this.scale = 1;
    this.dom = document.getElementById("popup_area");
    this.pop = document.getElementById("popup");
    this.body = this.pop.children[1];
    this.moving = false;
    this.bind = "";
    this.popup = new popupClass();
    window.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    });
  }

  show(str = "", bind = "") {
    if (bind != "") {
      this.bind = bind;
    }
    let title;
    let HTML;
    if (str != "") {
      let url = "";
      switch (str) {
        case "input":
          title = "Input key...";
          url = "popup/input.html";
          this.popup = new inputPopup();
          break;
        case "export":
          title = "Exporting...";
          url = "popup/export.html";
          this.popup = new exportPopup();
          break;
        default:
          break;
      }
      fetch(url)
        .then((response) => {
          return response.text();
        })
        .then((html) => {
          this.body.innerHTML = html;
        });
    }

    this.title.textContent = title;
    this.dom.style.left = "0px";
    this.dom.style.top = "0px";
    this.x = 0;
    this.y = 0;
    this.offX = 0;
    this.offY = 0;
    this.refX = 0;
    this.refY = 0;
    this.dom.hidden = false;
  }

  close() {
    this.dom.hidden = true;
  }

  /**
   *
   * @param {MouseEvent} event
   */
  setMoving(event) {
    this.moving = true;
    this.offX = event.clientX;
    this.offY = event.clientY;
  }

  clearMoving() {
    this.moving = false;
    this.refX = this.x;
    this.refY = this.y;
  }

  /**
   *
   * @param {MouseEvent} event
   */
  move(event) {
    if (this.moving == false) return;
    this.x = this.refX + (event.clientX - this.offX);
    this.y = this.refY + (event.clientY - this.offY);
    this.dom.style.left = `${this.x}px`;
    this.dom.style.top = `${this.y}px`;
  }

  done() {
    this.body.innerHTML = "";
    this.title.textContent == "Popup";
    this.popup.done();
    this.close();
  }
}

class popupClass {
  constructor() {}

  done() {}
}

class inputPopup extends popupClass {
  constructor() {
    super();
    this.display = document.getElementById("result_popup");
    addEventListener("keydown", this.getkey);
  }

  /**
   *
   * @param {Event} event
   */
  getkey(event) {
    let display = document.getElementById("result_popup");
    display.textContent = event.key;
    // this.done();
  }

  /**
   * @override
   */
  done() {
    console.log("Done input");
    removeEventListener("keydown", this.getkey);
    super.done();
  }
}

class exportPopup extends popupClass {
  constructor() {
    super();
    this.display = document.getElementById("main").cloneNode(true);
    this.removeAlpine(this.display);
    let display = this.display
    setTimeout(function(){document.getElementById("export_preview").innerHTML=display}, 100);
  }
  /**
   * @param {Element} elem
   */
  removeAlpine(elem) {
    elem.removeAttribute("x-data");
    elem.removeAttribute("x-effect");
    elem.removeAttribute("@dblclick");
    elem.removeAttribute("@mousedown");
    elem.removeAttribute("x-bind:transform");
    elem.removeAttribute(":class");
    elem.removeAttribute("@click");
    elem.removeAttribute("x-bind:d");
    elem.removeAttribute("x-text");
    for (let index = 0; index < elem.children.length; index++) {
      this.removeAlpine(elem.children[index]);
    }
  }
}
export default Popup;
