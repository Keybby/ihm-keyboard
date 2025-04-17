/**
 * @typedef {Object} Quest
 * @property {number} p - The priority or position of the quest
 * @property {string} text - The text description of the quest
 */

export const QUESTS = {
  SELECT_TOOL_CREATE: {
    p: 0,
    text: "Click on the `create key` button to start your design",
  },
  CREATE_FIRST_KEY: {
    p: 5,
    text: "Now, click on the canvas !",
  },
  MOVE_KEY: {
    p: 10,
    text: "You can select the `move key` button to place your key",
  },
  EDIT_KEY_GEOMETRY: {
    p: 30,
    text: "One a key is selected, you can change it's geometry. Try it !",
  },

  DOUBLE_CLICK_KEY: {
    p: 40,
    text: "To change the symbol of a key, you can double click on it.",
  },

  CREATE_MULTIPLE_KEYS: {
    p: 50,
    text: "Create muliple keys for your keyboard.",
  },

  RECTANGLE_SELECT: {
    p: 60,
    text: "With the `move` tool, you can also click and drag to create a selection box",
  },

  COPY_PASTE: {
    p: 63,
    text: "Once keys are selected, you can use CTRL-C and CTRL-V to duplicate them",
  },

  DELETE_KEYS: {
    p: 65,
    text: "You can delete keys with the `remove keys` tool, or with the <suppr> key",
  },

  CREATE_LAYER: {
    p: 70,
    text: "Once you have all the keys you need, you can create a new *layer*",
  },

  ACTIVATE_LAYER: {
    p: 71,
    text: "You created a layer that cannot be activated. Change that ! For more information, see https://github.com/Felerius/planck-layout",
  },

  HAVE_FUN: {
    p: 1000,
    text: "have fun ! Once your keyboard is created, you can export it.",
  },
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

    // Return the text of the next quest, or null if no uncompleted quests were found
    // @ts-ignore
    return nextQuest ? nextQuest.text : null;
  }
}

/*

TODO

"To set the key code to a combination of keys, double click on key and toggle the slider!",
"You can export your creation as an svg or a json by clicking on export.",
"If you want to modify previous design that you exported as a json, you can import it by clicking on import.",
"If the canvas on which you're drawing the keyboard is too small, you can resize it by dragging the edges of the canvas.",

*/
