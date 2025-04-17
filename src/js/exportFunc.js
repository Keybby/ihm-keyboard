import Keyboard from "./keyboard.js";
import KeyIdMap from "./keymap.js";
import Ui from "./ui.js";
import { getElementById } from "./ui.js";

/**
 * code partly taken from https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
 *
 * @param {Keyboard} current_keyboard
 * @param {Ui} current_ui
 */
const exportFunction = (current_keyboard, current_ui) => {
  //this function allows us to stringify
  // the class we use to represent the keyboard
  // and to export it as a json file

  //to get the scale of the UI

  const exportData = {
    ui_width: current_ui.width,
    ui_height: current_ui.height,
    ui_viewbox: current_ui.viewBox,
    keyboard: current_keyboard,
  };
  // we use the replacer function to convert the Map objects to arrays
  const blob = new Blob([JSON.stringify(exportData, replacer)], {
    type: "application/json",
  });
  // we create a way to download the json generated
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `keyboard_layout.json`;
  a.click();
  URL.revokeObjectURL(url);
};

function replacer(key, value) {
  // this function is used to convert the Map objects to arrays
  // so that we can stringify them
  if (value instanceof KeyIdMap) {
    return {
      dataType: "Map",
      value: Array.from(value.entries()), // or with spread: value: [...value]
    };
  } else {
    return value;
  }
}

//we export the export function
export default exportFunction;
