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

=== Snap and Collision detection

// TODO

=== Tutorial system

// TODO