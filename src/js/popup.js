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
      switch (str) {
        case "input":
          title = "Key input";
          this.popup = new inputPopup();
          break;
        case "export":
          title = "Exporting";
          this.popup = new exportPopup();
          break;
        case "import":
          title = "Importing";
          this.popup = new importPopup();
          break;
        case "svg":
          title = "Change svg";
          this.popup = new svgPopup();
          break;
        default:
          break;
      }
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
    this.x = this.refX + event.clientX - this.offX;
    this.y = this.refY + event.clientY - this.offY;
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
  /**
   *
   * @param {string} url
   */
  constructor(url) {
    if (url == "" || url == undefined) {
      return;
    }
    this.pop = document.getElementById("popup");
    this.body = this.pop.children[1];
    fetch(url)
      .then((response) => {
        return response.text();
      })
      .then((html) => {
        this.body.innerHTML = html;
      });
  }

  done() {}
}

class inputPopup extends popupClass {
  constructor() {
    super("popup/inputkey.html");
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
    removeEventListener("keydown", this.getkey);
    super.done();
  }
}

class exportPopup extends popupClass {
  constructor() {
    super("popup/export.html");
    let main = document.getElementById("main");
    this.display = main.cloneNode(true);
    setTimeout(
      function (display) {
        const preview = document.getElementById("export_preview");
        preview?.appendChild(display);
        preview.children[0].setAttribute(
          "viewBox",
          document.getElementById("main").getAttribute("viewBox")
        );
        /**
         *
         * @param {Element} elem
         */
        function removeAlpine(elem) {
          elem.removeAttribute("x-data");
          elem.removeAttribute("x-effect");
          elem.removeAttribute("@dblclick");
          elem.removeAttribute("@mousedown");
          elem.removeAttribute("x-bind:transform");
          elem.removeAttribute(":class");
          elem.removeAttribute("@click");
          elem.removeAttribute("x-if");
          elem.removeAttribute("@mousedown.prevent");
          elem.removeAttribute("@mouseup.prevent");
          elem.removeAttribute("@mousemove.prevent");
          for (let index = 0; index < elem.children.length; index++) {
            removeAlpine(elem.children[index]);
          }
        }
        removeAlpine(preview);
      },
      100,
      this.display
    );
  }
  /**
   * @param {Element} elem
   */
}

class importPopup extends popupClass {
  constructor() {
    super("popup/import.html");
  }
}

class svgPopup extends popupClass {
  constructor() {
    super("popup/svg.html");
    this.preview = document.getElementById("svg_preview");
    this.input = document.getElementById("edit_svg_path");
    setTimeout(this.default, 100);
    setTimeout(this.render, 150);
  }

  default() {
    if (this.preview == undefined) {
      this.preview = document.getElementById("svg_preview");
    }
    if (this.input == undefined) {
      this.input = document.getElementById("edit_svg_path");
    }
    fetch("assets/key.svg")
      // Get SVG response as text
      .then((response) => response.text())
      .then((str) => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then((xml) => {
        console.log(xml)
        this.input.value = xml.getElementsByTagName("svg")[0].innerHTML;
      });
  }

  render() {
    if (this.preview == undefined) {
      this.preview = document.getElementById("svg_preview");
    }
    if (this.input == undefined) {
      this.input = document.getElementById("edit_svg_path");
    }
    if (this.input.value.split("<").length>1) {
      this.preview.innerHTML = this.input.value;
    }
    else{
      this.preview.innerHTML = "";
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", this.input.value);
      this.preview.appendChild(path);
    }
  }
}
export default Popup;
