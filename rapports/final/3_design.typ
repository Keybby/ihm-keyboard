#import "styles.typ": bullet;
#import "@preview/note-me:0.3.0": admonition

== Paper prototypes
To choose our design, we first discussed what were in our opinion the most important aspects of our software with respect to the opinions we gathered during the requirements gathering, what would be the essential tools and how to implement them. After discussing these points, we each drew our first sketches to compare our visions of the software after agreeing on these points.

#figure(image("images/3sketch.png", width: 80%), caption: [Our individual sketch prototypes])

After discussing the results of the sketches, our sources of inspiration and analysis of the user flow, we agreed on several points :

#bullet("Realistic representation")[We wanted the user to be able to visualize their creation layer by layer, by opposition to current keyboards that allow either visualization of each key by clicking on a key or like real keyboards by putting several characters on a key touch. To select the layer, the user will click on the bottom left. This configuration allows the user to visualize clearly to which keyboard they gain access to by clicking on which modifier.]

#bullet("Recognition over recall")[To configure the keycode associated to a key, the user will double-click on it, which is standard practice for interacting with an object in computer software.]

//  However, this functionality should be hinted at too to avoid confusion.

#bullet("Emphasis on personalization")[The user will be able to modify the sizes of the keys, their rotations etc. on a side menu to the right and as an extension might also be able to import keys with a custom shape.]

#bullet("Important actions on the top")[A menu would be added to the top. In this menu, the user would be able to add a key, move a key(s), import a JSON configuration file, export the current representation of the current design and export the current design as a svg file.]

#bullet("Feedback and Affordance through a set of comprehensive tools")[The different actions available at one time on the main view of the software should be represented by a set of tools visible at any time. These tools should visibly imply the actions available to the user as well as the one they currently have selected.]

#bullet("(Extension) Allow for testing")[Create an emulator allowing the user to try out their design.]

#bullet("Non-intrusive guide")[Create a tutorial that the user can skip but that automatically appears on the screen telling them how to place a key, modify it and move it.]

== Final paper prototype and thoughts on implementation

The final paper design we came up with after the final discussions is the following :

#figure(image("images/sketch_final.jpg", width: 80%), caption: [The final paper prototype])

This design is greatly inspired by the image editing software like Photoshop, #link("https://www.photopea.com/")[Photopea], etc. The goal was to have a main window on which most of the interactions with the software would happen. Some more complicated operations, like importing and exporting, would require popup menus, of which there would never be more than one at a time.

We chose at this time that our app would be a web-based application, which would allow the greatest amount of people to experience the software, would it be for testing or actual use. The design would thus be realized using HTML and CSS.

The software would incorporate a 3 depth-level system user CSS's z-index values with the main working layer in the background, the user interface on top of it and finally the popups blocking the rest.

The user interface would be divided as follows :

#bullet("Top side : Main menu")[It holds the primary functions : Importing, exporting... as well as the main tools and the tips box (which would serve as our non-intrusive tutorial vector) would share the top-menu space.]

#bullet("Right-hand side : Key-menu")[ This is the menu where the user may see and change all the settings of the key they select (key size, rotation, binds...).]

#bullet("Bottom-left : Layers")[Being of main importance in how the keyboard actually works, we chose to give them their own menu on the bottom right (instead of being part of the right-menu like layers in our examples), which differentiates them from the key-specific settings on the right-hand menu.]

The colors used would be a close match with our inspiration tools for the best readability possible.

#figure(image("images/palette.svg", width: 80%), caption: [Our main color palette])

== Our mascot

At the time we were comparing the sketches on #link("https://www.figma.com/fr-fr/")[Figma] to create our final paper prototype, we also came up with a mascot to fit our visual identity and our purpose. We present to you, Keybby the Keycap :

#figure(image("images/keybby.svg", width: 40%), caption: [Keybby, the mascot of our software])

Keybby is composed of a simple square shape reminding of a keycap as well as letters to define its features aside from its eyes (O, W and V). Being made from scalable vector graphics, his likeness was reused throughout several graphical items if the tool, as well as reusing its shapes for other items to keep a distinct identity.

#figure(
  grid(
    columns: 3,
    column-gutter: -10mm,
    image("images/keybby_logo_off.svg", width: 100%),
    image("images/add.svg", width: 50%),
    image("images/keybby_light.svg", width: 50%),
  ),
  caption: [Several assets reusing Keybby's base],
)

All assets on the app are composed of assets either owned by us or in the public domain.


== The implemented design
Here is a screenshot of the software as seen in the online version :
#figure(image("images/screenshot.png", width: 100%), caption: [The design of the software, seen in the online version])

Here is the final design after the first wave of user testing, which lead to additional indicators for some functions (like the garbage cans and pencil icons) as well as the addition of additional tools and functions like enabling the grid magnetism which we will mention later. The layer on the background can move fully independently of the user interface sitting on top. It can be zoomed on and translated at will.


#figure(image("images/popup.png", width: 100%), caption: [The export popup of the online version])

The popups appear above the rest and can be moved freely around, but forbid interaction with the background, signalled by darkening said background when the popup is visible.

#figure(
  grid(
    columns: 2,
    column-gutter: 1mm,
    image("images/button.png", width: 50%), image("images/hovered_button.png", width: 50%),
  ),
  caption: [Button visual when not selected (left) and hovered/selected(minus the text) (right)],
)

The interface is meant to be reactive and give the maximum amount of feedback to the user on what it is doing and the current state of the program, which shortcomings the user feedback helped us iron out. This works by changing the style of the elements depending on the user interactions like hovering, giving the user secondary visual cues on the state like custom cursors on the canvas depending on their current selected tool (a square with a plus for add, a grabbing hand on a key when moving...) or having more direct cues that don't impact the user's flow if they already know the program, like having _\<Click Me>_ as a default text on a key or with the tips.

#figure(
  grid(
    columns: 2,
    column-gutter: 1mm,
    image("images/tips.png", width: 100%), image("images/tips_hover.png", width: 100%),
  ),
  caption: [Tips visual when not selected (left) and hovered (right)],
)

The resizable elements, like the canvas and the sidebar, are signalled by a small Neg-Highlight colored bar for recognition's sake, to catch the user's eye. They also change the user's cursor on hover to signal their use. Clipping and ... for the tips area are implying that the element can be expanded as well.

There remains a learning curve for the program since it is meant to be used by experimented people, but the fourfold increase in speed after the first try by one of our testers allows us to think that the program allows for pretty good learnability after the first couple of key rows.
