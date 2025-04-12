import Keyboard from "./keyboard.js";


/**
   *
   * @param {Keyboard} current_keyboard
   */

// code partly taken from https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
const exportFunction = (current_keyboard,) => {
  //this function allows us to stringify 
  // the class we use to represent the keyboard
  // and to export it as a json file

  // we use the replacer function to convert the Map objects to arrays
    const blob = new Blob([JSON.stringify(current_keyboard, replacer)], {
      type: 'application/json',
    });
    // we create a way to download the json generated
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keyboard_layout.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

function replacer(key, value) {
  // this function is used to convert the Map objects to arrays
    // so that we can stringify them
    if(value instanceof Map) {
        return {
        dataType: 'Map',
        value: Array.from(value.entries()), // or with spread: value: [...value]
        };
    } else {
        return value;
    }
}

function reviver(key, value) {
  // this function is used to convert the arrays back to Map objects
    // when we parse the json file (to be used when importing the file)
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

//we export the export function
export default exportFunction;

