/**
 *
 * @param {string} id
 * @returns {HTMLElement}
 */
function getElementById(id) {
  const result = document.getElementById(id);
  if (!result) {
    throw new Error(`${id} not found in DOM`);
  }
  return result;
}

/**
 *
 * @param {string} id
 * @returns {HTMLInputElement}
 */
function getInputElementById(id) {
  const result = document.getElementById(id);
  if (!result) {
    throw new Error(`${id} not found in DOM`);
  }
  // @ts-ignore
  return result;
}

class Popup {
  /*
  Definition of the pop-up class.

  Attributes of the class:
  - title : title of the pop up in the html page
  - x : current x coordinate of the pop up
  - y : current y coordinate of the pop up
  - refX : x coordinate of the pop up before it was moved
  - refY : y coordinate of the pop up before it was moved
  - offX : difference between the x position of the mouse and refX
  - off : difference between the y position of the mouse and refY
  - scale : the zooming scale currently applied to the page
  - dom : the grid inside which is the pop up
  - pop : the pop up element in the html
  - body : the body of the pop up
  - moving : boolean indicating if the pop up is being moved
  - bind : string indicating the type of pop up to be displayed
  - popup : construction of a popup class instance representing the pop up

  Methods :
  - show : display the pop up
  - close : close the pop up
  - setMoving : set the moving attribute to true and store the current mouse position
  - clearMoving : set the moving attribute to false and store the current position of the pop up
  - move : move the pop up according to the mouse position
  - done : clear the body of the pop up and close it

  */
  constructor() {
    this.title = getElementById("popup_title");
    this.refX = 0;
    this.refY = 0;
    this.x = 0;
    this.y = 0;
    this.offX = 0;
    this.offY = 0;
    this.scale = 1;
    this.dom = getElementById("popup_area");
    this.pop = getElementById("popup");
    this.body = this.pop.children[1];
    this.moving = false;
    this.popup = new popupClass();
    this.inputmode = false;
    // If the user presses escape, the pop up is closed
    window.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    });
  }

  show(str = "") {
    /*
    This function displays the pop up if bind is not empty and the type of pop up is not empty.
    It also sets the title of the pop up according to the type of pop up and changes the attribute pop accordingly as to display the right type of pop up.
    */

    // the title that will be given to the pop up
    let title = "";
    if (str != "") {
      switch (str) {
        /* the pop up can be :
        - an input pop up to set key values or the values of modifyers to atteign a specific layout
        - an export pop up allowing the user to export their configuration as a json
        - an import pop up allowing the user to inport a json file to display in the app
        - an svg pop up allowing the user to modify the appearance of a key
        */
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
        case "clear":
          title = "Clear all keys";
          this.popup = new clearPopup();
          break;
        default:
          // if the type of pop up isn't defined
          break;
      }
    }
    // we set the title of the pop up
    this.title.textContent = title;
    // we put no padding
    this.dom.style.left = "0px";
    this.dom.style.top = "0px";
    // initial position of the pop up
    this.x = 0;
    this.y = 0;
    this.offX = 0;
    this.offY = 0;
    this.refX = 0;
    this.refY = 0;
    // we display the pop up
    this.dom.hidden = false;
  }

  close() {
    /*
    This function hides the pop up in the window
    */
    this.dom.hidden = true;
  }

  /**
   *
   * @param {MouseEvent} event
   */
  setMoving(event) {
    // if start moving the pop up, we store the mouse's position
    this.moving = true;
    this.offX = event.clientX;
    this.offY = event.clientY;
  }

  clearMoving() {
    // if we stopped moving, we set the initial position to the current position after the move
    this.moving = false;
    this.refX = this.x;
    this.refY = this.y;
  }

  /**
   *
   * @param {MouseEvent} event
   */
  move(event) {
    /* if we have started moving the popup,
    we will move it's position according to
    the mouse's position until the event is stopped
    */
    if (this.moving == false) return;
    this.x = this.refX + event.clientX - this.offX;
    this.y = this.refY + event.clientY - this.offY;
    // we move the pop up on the page
    this.dom.style.left = `${this.x}px`;
    this.dom.style.top = `${this.y}px`;
  }

  done() {
    // This function suppresses traces
    // of the pop up in the html once
    // we have finished using it
    this.body.innerHTML = "";
    this.title.textContent == "Popup";
    this.popup.done();
    this.close();
  }
}

class popupClass {
  /*
  This class defines the basic popup class from which we'll derive pop ups with specific attributes.

  */
  /**
   *
   * @param {string|null} url
   */
  constructor(url = null) {
    const pop = document.getElementById("popup");
    if (pop === null) {
      throw new Error("popup element not found in DOM");
    }
    this.pop = pop;
    const body = this.pop.children[1];
    if (!body) {
      throw new Error("popup body not found in DOM");
    }
    this.body = body;
    if (url) {
      fetch(url)
        .then((response) => {
          return response.text();
        })
        .then((html) => {
          this.body.innerHTML = html;
        });
    }
  }

  done() {}
}

class inputPopup extends popupClass {
  /*
  The class input pop up is used when user have to input a key value or a modifier value.

  methods:
  - getkey : get the key value pressed by the user and display it in the pop up
  - done : clear the body of the pop up and close it
  */
  constructor() {
    super("popup/inputkey.html");
    addEventListener("keydown", this.getkey);
  }

  /**
   *
   * @param {KeyboardEvent} event
   */
  getkey(event) {
    let display = getElementById("result_popup");
    // we display the key pressed in the pop up
    display.textContent = event.key;
    event.preventDefault();
    event.stopPropagation();
    // this.done();
  }

  /**
   * @override
   */
  done() {
    // we remove the event listener to stop listening to the key pressed
    removeEventListener("keydown", this.getkey);
    super.done();
  }
}

class exportPopup extends popupClass {
  /*
  This class defines an export pop up.

  methods:
  - constructor : create the export pop up and display the keyboard in it
  */
  constructor() {
    // we get the basic template
    super("popup/export.html");
    let svg = /** @type {Element} */ (
      getElementById("svgdiv").children[0].cloneNode(true)
    );
    this.removeAlpineFull(svg);
    setTimeout(() => {
      const preview = getElementById("export_preview");
      preview.innerHTML = "";
      preview?.appendChild(svg);
      const view_box = getElementById("main").getAttribute("viewBox");
      if (view_box) {
        preview.children[0].setAttribute("viewBox", view_box);
      }
      this.exportSVG();
    }, 150);
  }
  /**
   *
   * @param {Element} elem
   * @returns
   */
  removeAlpineFull(elem) {
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
    elem.removeAttribute("x-bind:transform");
    elem.removeAttribute("x-bind:d");
    elem.removeAttribute("x-bind:x");
    elem.removeAttribute("x-bind:y");
    elem.removeAttribute("x-bind:height");
    elem.removeAttribute("x-bind:width");
    elem.removeAttribute(":key");
    elem.removeAttribute("name");
    elem.removeAttribute("x-text");
    elem.removeAttribute("x-bind:fill");
    elem.removeAttribute("@contextmenu.prevent");
    elem.removeAttribute("@auxclick.prevent");
    elem.removeAttribute("x-bind:font-size");
    // we remove aalpine from all the children of the node
    let change = true;
    while (change) {
      change = false;
      for (let index = 0; index < elem.children.length; index++) {
        if (elem.children[index].tagName == "TEMPLATE") {
          elem.removeChild(elem.children[index]);
          change = true;
          break;
        }
      }
    }
    for (let index = 0; index < elem.children.length; index++) {
      this.removeAlpineFull(elem.children[index]);
    }
    return elem;
  }

  exportSVG() {
    let svg = getElementById("export_preview").children[0];
    const blob = new Blob([svg.outerHTML], { type: "image/svg+xml" });
    let url = URL.createObjectURL(blob);
    const export_button = getInputElementById("export_svg");
    export_button.setAttribute("href", url);
    export_button.disabled = false;
  }

  /**
   * @param {Element} elem
   */
}

class importPopup extends popupClass {
  /*
  This class defines a basic import pop up that takes the import template
  */
  constructor() {
    super("popup/import.html");
    this.selected = "azerty";
  }

  /**
   *
   * @param {string} name
   */
  select(name) {
    this.selected = name;
  }

  /**
   *
   * @param {string} name
   * @returns
   */
  isSelected(name) {
    return name == this.selected;
  }
}

class svgPopup extends popupClass {
  /*
  this class defines a svg pop up that allows to modify the svg display of a key
  */
  constructor() {
    // we use the template
    super("popup/svg.html");
    // to preview the svg
    this.preview = getElementById("svg_preview");
    // to modify the outline of the svg
    this.input = getInputElementById("edit_svg_path");
    // we set timeouts to wait for the fetch to be done
    setTimeout(this.default, 100);
    setTimeout(this.render, 150);
  }

  default() {
    if (this.preview == undefined) {
      this.preview = getElementById("svg_preview");
    }
    if (this.input == undefined) {
      /** @type {HTMLInputElement} */
      this.input =
        /** @type {HTMLInputElement} */
        (getElementById("edit_svg_path"));
    }
    // we fetch the svg file representing a key
    // and we set the inner html of the preview to the svg file
    fetch("assets/key.svg")
      // Get SVG response as text
      .then((response) => response.text())
      .then((str) => new window.DOMParser().parseFromString(str, "text/xml"))
      .then((xml) => {
        this.input.value = xml.getElementsByTagName("svg")[0].innerHTML;
      });
  }

  render() {
    // we render the svg in the preview
    if (this.preview == undefined) {
      this.preview = getElementById("svg_preview");
    }
    if (this.input == undefined) {
      this.input = getInputElementById("edit_svg_path");
    }
    if (this.input.value.split("<").length > 1) {
      this.preview.innerHTML = this.input.value;
    } else {
      this.preview.innerHTML = "";
      // we create a new svg element
      const path = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      path.setAttribute("d", this.input.value);
      this.preview.appendChild(path);
    }
  }
}

class clearPopup extends popupClass {
  /*
  this class defines a svg pop up that allows to modify the svg display of a key
  */
  constructor() {
    // we use the template
    super("popup/clear.html");
  }
}
export default Popup;
