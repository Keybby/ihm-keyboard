#import "@preview/fletcher:0.5.4" as fletcher: diagram, node, edge

#link("https://github.com/Keybby/ihm-keyboard")[Our git repository]

// TODO:
// - Model Controler View
// - KISS
// - highlights:
//   - popup system
//   - snap and collision detection
//   - logic for the tutorial / tips

As stated in the design part, we chose for our app to be web-based. This means our application would be bound by HTML, CSS and Javascript, atop which we added two additional elements: 
- To program more safely, since our app would rely heavily on a lot of different classes across multiple files, we chose to also include Typescript type verification in our workflow.
- To have greater versatility and reduce the complexity of linking code and visuals we also used the #link("https://alpinejs.dev/")[Alpine.js] framework. which allows for a easy implementation of bindings as well as other behavior directly in the HTML markup.

Here is how the Model Control View diagram of our application looks like : 

*INSERT DIAGRAM*

== KISS

== Feature highlights

=== Popup system

The popup box we use for Import, Export, Clear and Key input is always present within the dom but modified and displayed in real time when necessary. In the DOM, it behaves as a grid whose center element is the popup itself. When the popup is grabbed, the whole grid is moved around and the position is reset when a new popup is called. In the backend, the DOM for each popup is stored inside a specific HTML file.

When the popup is called, a switch case determines which popup child class needs to be created and stored. This element fetches the correct HTML and inserts it into the DOM. It also gives the necessary methods for the popup to behave correctly.

Here are a few quirks for two popups : Export and Key Input :

- Export displays on the left a copy of the user's canvas. This copy is obtained from the DOM and then cleared of any attribute specific to Alpine so that it can be read by the user on their own computer without any error. 

- The key input popup registers the key pressed by the user on keydown and only saves on the last keyup before closing. This allows for key combos like Shift+A to actually register a "A" instead of "a". The operation type between append and replace is also stored in the popup main class directly to keep memory between uses within the same session. 

=== Snap and Collision detection

// TODO

=== Tutorial system

// TODO