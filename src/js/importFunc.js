import App from "./app.js";
import Keyboard from "./keyboard.js";

/**
 * 
 * @param {File} file
 * @param {App} app 
 */
export function importFunction(file, app){

  const reader = new FileReader();
  reader.onload = function () {
    const text = reader.result;
    if (typeof text === 'string') {
      try {
        const data = JSON.parse(text);
        app.keyboard = Keyboard.parseJson(data);
        app._init();
      } catch (e) {
        console.error('Error parsing JSON:', e);
      }
    } 
    else {
      console.error('File content is not a valid string');
    }
  };
  reader.readAsText(file);
}

// function reviver(key, value) {
//     // this function is used to convert the arrays back to Map objects
//     // when we parse the json file (to be used when importing the file)
//     if(typeof value === 'object' && value !== null) {
//         if (value.dataType === 'Map') {
//         return new Map(value.value);
//         }
//     }
//     return value;
// }

/**
 * Rehydrates a serialized Map from JSON, using custom fromJSON methods
 * for both keys and values.
 *
 * @template K, V
 * @param {{ dataType: string, value: any[] }} obj
 * @param {(key: any) => K} keyFromJSON
 * @param {(value: any) => V} valueFromJSON
 * @returns {Map<K, V> | undefined}
 */
export function reviver(obj, keyFromJSON, valueFromJSON) {
    try {
      if (obj?.dataType === "Map" && Array.isArray(obj.value)) {
        const map = new Map();
        for (const [rawKey, rawVal] of obj.value) {
          const key = keyFromJSON(rawKey);
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
  
