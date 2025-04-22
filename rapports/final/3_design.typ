#import "styles.typ": bullet;

To choose our design, we first discussed what were in our opinion the most important aspects of our software, what would be the essential tools and how to implement them. After discussing these points, we each drew our first sketches to compare our visions of the software after agreeing on these points.

#figure(image("images/3sketch.png", width: 80%),)

After discussing these sketches, we agreed on several points : 

#bullet("Realistic representation")[We wanted the user to be able to visualize their creation layer by layer, by opposition to current keyboards that allow either visualization of each key by clicking on a key or like real keyboards by putting several characters on a key touch. To select the layer, the user will click on the bottom left. This configuration allows the user to visualize clearly to which keyboard they gain access to by clicking on which modifyer]

#bullet("Recognition over recall")[To configure the keycode associated to a key, the user will double click on it, which is standard practice for interacting with an object in computer software. However, this functionnality should be hinted at too to avoid confusion]

3. The user will be able to modify the sizes of the keys, their rotations etc on a side menu to the right 

4. A menu would be added to the top. In this menu, the user would be able to add a key, move a key(s), import a JSON configuration file, export the current representation of the current design and export the current design as an svg file

5. Create an emulator allowing the user to try out their design
Create a tutorial that the user can skip but that automatically appears on the screen telling them how to place a key, modify it and move it

Here is the design we submitted after discussing these points : 
#figure(image("images/sketch_final.jpg", width: 80%),)