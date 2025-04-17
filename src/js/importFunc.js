import App from "./app.js";
import KeyId from "./key.js";
import Keyboard from "./keyboard.js";
import KeyIdMap from "./keymap.js";
import { getElementById } from "./ui.js";

/**
 * 
 * @param {string} text
 * @param {App} app 
 */
export function importFunction(text, app){


  try {
    const data = JSON.parse(text);

    //the keyboard
    app.keyboard = Keyboard.parseJson(data.keyboard);

    //scale of the UI
    const view = getElementById("svgdiv"); 
    view.style.gridTemplateRows = data.ui_gridRows;
    view.style.gridTemplateColumns = data.ui_gridColumns;
  } catch (e) {
    console.error('Error parsing JSON:', e);
  }
}


/**
 * Parses a KeyIdMap from JSON, using custom fromJSON methods
 * for both keys and values.
 *
 * @template K, V
 * @param {{ dataType: string, value: any[] }} obj
 * @param {(value: any) => V} valueFromJSON
 * @returns {KeyIdMap<V> | undefined}
 */
export function reviver(obj, valueFromJSON) {
    try {
      if (obj?.dataType === "Map" && Array.isArray(obj.value)) {
        const map = new KeyIdMap();
        for (const [rawKey, rawVal] of obj.value) {
          const key = KeyId.fromJson(rawKey);
          const val = valueFromJSON(rawVal);
          map.set(key, val);
        }
        return map;
      }
    } catch (e) {
      console.error("Error parsing Map from JSON:", e);
    }
    return undefined;
  }
  
