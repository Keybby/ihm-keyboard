#import "@preview/fletcher:0.5.7" as fletcher: diagram, node, edge
#import "@preview/cetz:0.3.4": canvas, draw
#import "styles.typ": bullet;

#link("https://github.com/Keybby/ihm-keyboard")[Our git repository] and #link("https://keybby.github.io/ihm-keyboard/")[the online tool]

// TODO:
// - Model Controler View
// - KISS
// - highlights:
//   - popup system
//   - snap and collision detection
//   - logic for the tutorial / tips

As stated in the design part, we chose for our app to be web-based, and without any backend logic.

When we selected the languages and tools for this project, we followed 3 main principles:

#bullet("K.I.S.S (Keep it simple, stupid)")[In particular, we did not want to use a heavy framework from NPM with too many features. This would slow down our app, take us time to understand how the library works and hide complexity. In comparison, HTML + CSS + vanilla JavaScript is something we understand quite well, there is no risk of an edge case because of the specific of how the library works.]

#bullet("Declarative UI")[Syncing the state of our app and the DOM can be very code-heavy and introduce spaghetti code. We need a way to update the DOM automatically when our model change.]

#bullet("Static checks")[Checking the app logic before running it can catch a lot of bugs (typos, wrong types, function signatures ...)]

With these principles in mind, we chose the following languages and tools:
- JavaScript with #link("https://jsdoc.app/about-getting-started")[JsDoc] and the typescript compiler in JS mode. This allows us to check JavaScript statically, without having to learn Typescript.
- The #link("https://alpinejs.dev/")[Alpine.js] library for the declarative part.


== Logic of our app

The Alpine.js framework allows us to structure our app with the _Model View Controller_ (MVC) architecture.

#diagram(
  node-stroke: 1pt,
  spacing: (3em, 5em),
  node((1, 0), [Model (Js data)], name: <model>),
  node((0, 1), [Controller (Alpine)], name: <controler>),
  node((2, 1), [View (DOM)], name: <view>),
  edge(<model>, <controler>, "-|>", [injects], bend: 10deg),
  edge(<controler>, <model>, "-|>", [notifies], bend: 10deg),
  edge(<controler>, <view>, "-|>", [updates]),
  edge(<controler>, "d", "<-", [User acts]),
  edge(<view>, "d", "->", [User sees]),
)

For reference, here are the main variables of our app:
#block(breakable: false)[
  ```js
  class App {
    // tool selected
    selectedTool;
    // layer selected
    selectedLayer;
    // selected keys
    selectedKeys;
    // the last inputs of the user, to handle drag and rectangle selection
    lastClicked; lastMoved;
    // keyboard information
    keyboard;
    // the tasks the user has done (for the tutorial)
    quests;
  }
  ```
]

== SVG

The currently created keyboard is displayed directly as SVG.

This choice has 2 main benefits: we can add event listeners directly on the keys, and we can export the SVG easily, by copying the content of the DOM #footnote[There is a bit of cleaning going on though: we must remove the alpine attributes from the keys]

Here is a simplified version of how we did it:
#block(breakable: false)[
  ```html
  <template x-for="key_id in app.keyboard.getKeys()" :key="key_id.value">
    <g
      x-data="{view: app.keyView(key_id)}"
      @dblclick="..." @mousedown="..."
      x-bind:transform="`rotate(${view.rotation}, ${view.centerX}, ${view.centerY})`"
      :class="..."
    >
      <path
        x-bind:d="app.keySvgPath(key_id)"
        x-bind:fill="..."
        stroke="#333333" stroke-width="3"
      />
      <text
        x-text="view.layout.toString() || '<Click me>'"
      />
    </g>
  </template>
  ```
]
== Snap and Collision detection

We took a lot of time implementing the right kind of dragging behavior.

Indeed, this is the most standard and intuitive way to place the keys, so it must guide the user to place them where he wants.
This is done by two mechanisms: *collision resolution* and *snap behavior*.


#let size = 2

#grid(
  columns: (1fr, 1fr),
  align: center,
  gutter: 20pt,
  [*Collision resolution*], [*Snap*],
  canvas({
    let offset-x = 1.5
    let offset-y = -1.2
    draw.rect((-size / 2, -size / 2), (size / 2, size / 2), fill: blue.lighten(80%), stroke: blue.darken(40%))
    draw.rect(
      (size / 2, -size / 2 + offset-y),
      (size + size / 2, size / 2 + offset-y),
      fill: red.lighten(80%),
      stroke: red.darken(40%),
    )
    draw.rect(
      (-size / 2 + offset-x, -size / 2 + offset-y + 0.2),
      (size / 2 + offset-x, size / 2 + offset-y + 0.2),
      fill: red.lighten(80%).opacify(-70%),
      stroke: (paint: red.darken(40%), dash: "dashed"),
    )
    draw.line((size, -size / 2 + offset-y - 0.5), (size + 0.6, -size / 2 + offset-y - 0.8), mark: (end: "stealth"))
  }),
  canvas({
    let offset-x = 4
    let offset-y = 0.5
    draw.rect((-size / 2, -size / 2), (size / 2, size / 2), fill: blue.lighten(80%), stroke: blue.darken(40%))
    draw.rect(
      (-size / 2 + offset-x, -size / 2),
      (size / 2 + offset-x, size / 2),
      fill: red.lighten(80%),
      stroke: red.darken(40%),
    )
    draw.rect(
      (-size / 2 + offset-x, -size / 2 + offset-y),
      (size / 2 + offset-x, size / 2 + offset-y),
      fill: red.lighten(80%).opacify(-70%),
      stroke: (paint: red.darken(40%), dash: "dashed"),
    )
    draw.line((-size / 2, 0), (5, 0), sroke: (dash: "dashed"), name: "x-axis")
    draw.line((offset-x + size, 0.6), (offset-x + size, -0.2), mark: (end: "stealth"))
  }),

  [When the selected key collides with another one], [When the key almost aligns with another one],
)

Collisions are known to be quite hard to compute in general, so we designed an algorithm that works well in most cases.

#block(breakable: false)[
  ```js
  resolve_snap_x(translation, k0):
    for each selected key k0:
      k0.pos <- ko.pos + translation
      k1 <- nearest key from k0
      if k1 almost aligns with k0:
        p <- projection from k0 to k1 along axis x
        return translation + p

  resolve_snap_y():
    same as x

  resolve_collision(translation):
    while there is a collision:
      for each selected key k0:
        k0.pos <- ko.pos + translation
        k1 <- nearest key from k0
        if k1 collides with k0:
          dir <- direction from the mouse to the center of k1
          translation <- translation + k*dir
    return translation
  ```
]
We then resolve snap and collision each time the user moves the mouse.

Additionally, our collision and snap logics work with rotated keys, since on some keyboards entire rows or columns can be rotated.

#figure(
  caption: "the reviung41, a keyboard where the columns are aligned but tilted",
  image("images/reviung41.png", height: 100pt),
)

The copy-paste functionnality is based on the same logic.

== Popup system

The popup box we use for Import, Export, Clear and Key input is always present within the DOM but modified and displayed in real time when necessary. In the DOM, it behaves as a grid whose center element is the popup itself. When the popup is grabbed, the whole grid is moved around and the position is reset when a new popup is called. In the backend, the DOM for each popup is stored inside a specific HTML file.

When the popup is called, a switch case determines which popup child class needs to be created and stored. This element fetches the correct HTML and inserts it into the DOM. It also gives the necessary methods for the popup to behave correctly.

Here are a few quirks for two popups : Export and Key Input :

- Export displays on the left a copy of the user's canvas. This copy is obtained from the DOM and then cleared of any attribute specific to Alpine so that it can be read by the user on their own computer without any error.

- The key input popup registers the key pressed by the user on keydown and only saves on the last keyup before closing. This allows for key combos like Shift+A to actually register a "A" instead of "a". The operation type between append and replace is also stored in the popup main class directly to keep memory between uses within the same session.


== Tutorial system

There was a lot of debate on whether to choose a _tutorial system_ of a _hint system_.

We ended up with a tradeoff between the 2. The user receives some hint of what to do next, depending on what he has already done.

The corresponding algorithm is quite simple. The app has a list of milestones that the user must to do master the app.

```js
export const QUESTS = {
  SELECT_TOOL_CREATE: { ... },
  CREATE_FIRST_KEY: { ... },
  MOVE_KEY: { ... },
}
```

Each quest has a priority.
At each moment in time, the interface displays the hint corresponding to the milestone with the highest priority.


For the demo, the progression is not stored between reloads, but for the deployed app it is stored in the local storage.
