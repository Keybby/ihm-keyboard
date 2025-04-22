#import "styles.typ": bullet;

To choose our design, we first discussed what were in our opinion the most important aspects of our software with respect to the opinions we gathered during the requirements gathering, what would be the essential tools and how to implement them. After discussing these points, we each drew our first sketches to compare our visions of the software after agreeing on these points.

#figure(image("images/3sketch.png", width: 80%),)

After discussing the results of the sketches, our sources of inspiration and analysis of the user flow, we agreed on several points : 

#bullet("Realistic representation")[We wanted the user to be able to visualize their creation layer by layer, by opposition to current keyboards that allow either visualization of each key by clicking on a key or like real keyboards by putting several characters on a key touch. To select the layer, the user will click on the bottom left. This configuration allows the user to visualize clearly to which keyboard they gain access to by clicking on which modifier.]

#bullet("Recognition over recall")[To configure the keycode associated to a key, the user will double click on it, which is standard practice for interacting with an object in computer software.]

//  However, this functionality should be hinted at too to avoid confusion.

#bullet("Emphasis on personalization")[The user will be able to modify the sizes of the keys, their rotations etc on a side menu to the right and as an extension might also be able to import keys with a custom shape.]

#bullet("Important actions on the top")[A menu would be added to the top. In this menu, the user would be able to add a key, move a key(s), import a JSON configuration file, export the current representation of the current design and export the current design as an svg file.]

#bullet("Feedback and Affordance through a set of comprehensive tools")[The different actions available at one time on the main view of the software should be represented by a set of tools visible at any time. These tools should visibly imply the actions available to the user as well as the one they currently have selected.]

#bullet("(Extension) Allow for testing")[Create an emulator allowing the user to try out their design.]

#bullet("Non-intrusive guide")[Create a tutorial that the user can skip but that automatically appears on the screen telling them how to place a key, modify it and move it.]

The final paper design we came up with after the final discussions is the following : 

#figure(image("images/sketch_final.jpg", width: 80%),)

We chose at this time that our app would be a web-based application, which would allow the greatest amount of people to experience the software, would it be for testing or actual use. The design would thus be realized using HTML and CSS.

This design is greatly inspired by the image editing software like Photoshop, #link("https://www.photopea.com/")[Photopea], etc. The goal was to have a main window on which most of the interactions with the software would happen. Some more complicated operations, like importing and exporting, would require popup menus, of which there would never be more than one at a time.

The software would thus incorporate a 3 depth-level system user CSS's z-index values with the main working layer in the background, the ui on top of it and finally the popups blocking the rest.

The layers being of main importance in how the keyboard actually works, we chose to give them their own menu on the bottom right, which would differentiate it from the key-specific settings on the right-hand menu (key size, rotation, binds...). Finally, the functional menu, the main tools and the tips box (which would serve as our non-intrusive tutorial vector) would share the top-menu space.  
