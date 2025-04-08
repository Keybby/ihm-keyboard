class Popup {
  constructor() {
    this.title = document.getElementById("popup_title")
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
    this.popup=new popupClass();
    window.addEventListener("keyup", (event) => {
      if (event.key === "Escape") {
        this.close();
      }
    });
  }

  show(str = "") {
    let title;
    let HTML;
    if (str != "") {
      let url = "";
      switch (str) {
        case "input":
          title = "Input key...";
          url="popup/textinput.html"
          this.popup=new inputPopup();
          break;
        default:
          break;
      }
      fetch(url)
        .then((response) => {
          console.log(response)
          return response.text();
        })
        .then((html) => {
          console.log("HTML REçu : ", html)
          this.body.innerHTML = html;
        });
    }
    
    this.title.textContent=title;
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

class popupClass{
  constructor(){}

  done(){
    "done without a class ???"
  }
}

class inputPopup extends popupClass{
  constructor(){
    super();
    this.display=document.getElementById("result_popup");
    addEventListener("keydown", this.getkey);
  }

  getkey(event) {
    if(this.display==undefined){
      this.display = document.getElementById("result_popup");
    }
    console.log("catch");
    this.display.textContent = event.key;
  }

  /**
   * @override
   */
  done(){
    console.log("Done input")
    removeEventListener("keydown",this.getkey)
  }
}

export default Popup;
