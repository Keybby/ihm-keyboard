import Keyboard from "./keyboard.js";


/**
   *
   * @param {Keyboard} current_keyboard
   */

// https://stackoverflow.com/questions/29085197/how-do-you-json-stringify-an-es6-map
const exportFunction = (current_keyboard,) => {
    const blob = new Blob([JSON.stringify(current_keyboard, replacer)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `keyboard_layout.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

function replacer(key, value) {
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
    if(typeof value === 'object' && value !== null) {
      if (value.dataType === 'Map') {
        return new Map(value.value);
      }
    }
    return value;
  }

export default exportFunction;
/*
function export2(current_keyboard){
    let layers = current_keyboard.additionalLayers();

    let data = {};

    for (let i = 0; i < layers.length; i++){
        data[layers[i].name] = getData(layers[i]);
    }
}

function getData(layer){
    let data = {};
    data.name = layer.name;
    data.keyMap = layer.keyMap.map((key, value) => {
        return {
            key: key,
            value: value
        };
    });

    return data;
}
    */
