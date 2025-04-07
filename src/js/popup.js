class Popup {
  constructor() {
    this.html = "";
    this.title = "Popup";
    this.refX = 0;
    this.refY = 0;
    this.x = 0;
    this.y = 0;
    this.offX = 0;
    this.offY = 0;
    this.scale = 1;
    this.dom = document.getElementById("popup_area");
    this.pop = document.getElementById("popup");
    this.moving = false;
    window.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    });
  }

  show() {
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
}

export default Popup;
