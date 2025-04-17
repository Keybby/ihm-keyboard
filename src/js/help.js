/**
 * @typedef {Object} Quest
 * @property {number} p - The priority or position of the quest
 * @property {string} text - The text description of the quest
 */

export const QUESTS = {
  SELECT_TOOL_CREATE: {
    p: 0,
    text: "click on the `create key` button to start your design",
  },
  CREATE_FIRST_KEY: {
    p: 5,
    text: "now, click on the canvas !",
  },
  MOVE_KEY: {
    p: 10,
    text: "now, you can select the `move key` button to place your key",
  },
  EDIT_KEY_GEOMETRY: {
    p: 30,
    text: "one a key is selected, you can change it's height, width and rotation",
  },

  HAVE_FUN: {
    p: 1000,
    text: "have fun !",
  },

  // DOUBLE_CLICK_KEY: {
  //   p: 40,
  //   text: "To change the symbol of a key, you can double click on it.",
  // },

  // MULTIPLE_KEYS: {
  //   p: 50,
  //   text: "Please select keys, then validate. The keys you select will be the 'activation combo' for this layer.",
  // },

  // CREATE_LAYER: {
  //   p: 50,
  //   text: "Please select keys, then validate. The keys you select will be the 'activation combo' for this layer.",
  // },

  // // FIXME: this is not a quest
  // SET_ACTIVATION: {
  //   p: 50,
  //   text: "Please select keys, then validate. The keys you select will be the 'activation combo' for this layer.",
  // },
  // "Now, the keys you selected are colored in black. The only role of these keys is to switch to the current layer.";
};

export default class QuestManager {
  constructor() {
    this.complete = new Set();
    let id_to_text = new Map();
    for (const { p, text } of Object.values(QUESTS)) {
      id_to_text.set(p, text);
    }
    this.id_to_text = id_to_text;
  }
  /**
   *
   * @param {Quest} quest
   */
  done(quest) {
    this.complete.add(quest.p);
  }

  /**
   * Gets the text of the next uncompleted quest with the lowest priority
   * @returns {string|null} The text of the next quest, or null if all quests are completed
   */
  nextQuestText() {
    // Start with no quest found and the highest possible priority
    let nextQuest = null;
    let lowestPriority = Infinity;

    // Iterate through all quests
    Object.values(QUESTS).forEach((quest) => {
      // Skip completed quests
      if (this.complete.has(quest.p)) {
        return;
      }

      // If this quest has a lower priority than what we've found so far
      if (quest.p < lowestPriority) {
        nextQuest = quest;
        lowestPriority = quest.p;
      }
    });

    console.log(nextQuest);
    // Return the text of the next quest, or null if no uncompleted quests were found
    // @ts-ignore
    return nextQuest ? nextQuest.text : null;
  }
}

const RANDOM_TIPS = [
  "To select several keys, you can create a selection box by clicking and dragging your mouse.",
  "To modify the code of a single key, double click on it.",
  "To set the key code to a combination of keys, double click on key and toggle the slider!",
  "To suppress a key, you can use suppr",
  "To modify the geometry of the key or rotate it, use the geometry panel to the right after selecting the key!",
  "You can export your creation as an svg or a json by clicking on export.",
  "If you want to modify previous design that you exported as a json, you can import it by clicking on import.",
  "If the canvas on which you're drawing the keyboard is too small, you can resize it by dragging the edges of the canvas.",
  "If you want to move a key, select the move icon at the top center left and drag the key to the desired position.",
  "If you want to create a key, select the create icon at the top center right and click where you want to place your key.",
];
