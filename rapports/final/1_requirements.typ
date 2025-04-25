== Identifying the user needs

// FIXME: introduce what we used and why: (done)
// - survey
// - analysis of existing tools
// - debates and simulations (kind-of)

// FIXME: Add keywords from the lesson. Talk about affinity diagrams ? (we didn't use them though right?)


=== Keyboard Layout Editor (KLE) <kle>

This tool is a preexisting tool that we looked at a lot since it is a reference in the keyboard customization community. This tool wasn't in our experience used easily and the layout wasn't intuitive. For those of us who had never looked at this type of software, we struggled to understand all the options we could use and how to do basic tasks such as : creating a key, inputting the character that should be linked to the key, how to create layers etc. This tools provided though a lot of visual options such as modifying the color of a key.

=== Reddit : Survey on desired features
// FIXME: move the reasonning on why we needed the survey in "Identifying the user needs". done

To identify the user needs, we decided to directly ask people that fitted the profiles of potential users : people that want to customize their keyboards, whether it is for gaming, as a hobby,  professionnally or because of an impairment. To start a discussion with them, we posted on subreddits focalised on this activity and mechanical keyboards, ie r/MechanicalKeyboards and r/olkb. We chose these subreddits because they were focused on keyboards discussions, and since keyboard customization is quite niche, we couldn't just ask the general population as they would probably not be the main users of our site. Therefore, we went to ask the people that would most likely use it, and posting on public forums can :
- gather a lot of input since there are a lot of people on these subreddits. r/MechanicalKeyboards has 1.3 Million users and r/olkb has 62k users.
- The posts stay on for a long time so we could gather more input has time passes if people find our post later on
- it makes reaching out to niche communities easier

The post we made on #link("https://www.reddit.com/r/olkb/comments/1jazgx5/usability_survey_for_keyboard_prototyping_tools/")[r/olkb] we got 4 users input, and the redditors gave us examples and ressources. The main points that the user desired were :

- #link("https://www.keyboard-layout-editor.com/")[Keyboard Layout Editor(KLE)] was considered pretty much perfect by an editor as it allowed to change the style, colors, etc. One problem for this user was that it wasn't easy to use on mobile, and it doesn't provide key statistics per language, so this would set our tool appart as it is something that we thought about to extend the project. Here are some examples of what can be achieved using this site : #link("https://www.keyboard-layout-editor.com/#/gists/13189415e484873668d1953f8338ecd4")[1], #link("https://www.keyboard-layout-editor.com/#/gists/91301391175763959e944a60978ef0d3")[2], #link("https://www.keyboard-layout-editor.com/#/gists/76d41d783f66ed50292cc7b7d057dac7")[3], #link("https://www.keyboard-layout-editor.com/#/gists/77fc8649d52df8d7a5a039c1afd49564")[4]. Another user however pointed out that this tool doesn't handle curves or non-standard keys, as can be seen on this #link("https://www.keyboard-layout-editor.com/#/gists/97774da6d78d071ac0aa955e92da9219")[example] when attempting to reproduce a #link("https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/MS_Natural_Keyboard_Pro.JPG/1280px-MS_Natural_Keyboard_Pro.JPG")[MS Natural Original Keyboard]. Another issue pointed out with this tool is that KLE uses two versions of JSON, one of which is non standard which can cause issues with 3rd party tools. Also, there is no snap to grid functionnality allowing the user to automaticalluy align the keys together. Finally, the image exports is considered not great, developpers were working on an SVG exports that was never finished.
- Integrating Swill's laser cutouts : Swill is a web-based tool that generates SVG files for laser cutting keyboards plates and cases.
- Integrating KLE-render : a tool that  that a KLE layout and generates a 3D rendering of the keyboard.
- Using #link("https://openscad.org/")[OpenSCAD] for the mechanical design : hard to use for basic tasks but there are Python extensions to make it easier to use, but not as easy as SolidWorks. The user mentionning this tools would like a computer-aided design tool for Linux that is visual.
- One user mentioned computeritis (an ailment caused by the use of computers (pain in some fingers, etc)) as a cause for wanting to personnalise their keyboard. This user writes mostly using dictation mode and voice commands but for corrections, some keys (like backspace, etc) are still needed. This user uses a lot of chords (pressing several keys to do an action), this increases the number of actions they can do with a small number of keys. They often need to reprogramm their keyboard for specific usage, and a visual tool would be practical since it would be easier to remember and use as customized keyboards don't have the characters sent to the computers printed on them by default. This user also indicated that some combination of keys were easier for them to use relating to their placement and the Repetitive Strain Injury (or computeritis).

For the post we made on #link("https://www.reddit.com/r/MechanicalKeyboards/comments/1jb0akb/usability_survey_for_keyboard_prototyping_tools/")[r/MechanicalKeyboards], we got one response :
- The user desires a more modern Keyboard Layout editor and a software that creates PCB(printed Circuit Board) according to the custom layout which would save time from having to do it in KiCad or another similar software. For them, providing statistic on keys used per language would not be really pertinent for their use.

We didn't get many answers on reddit, but this could be because of how the site functions. If people agree with what has been said, they won't duplicate it by giving another answer. Therefore, this could explain why we only got five responses, some of which were really developped on the struggles the users face.

To gather basic requirements, we focused on the tools that the redditors referred to us as useful and practical.

=== Requirements gathered from existing tools
The users should be able to :
- Place their keys as they want and change their format/dimensions
- Be able to label the keys as they wish, including special character such as an arrow, the label for the enter key, etc.
- be able to customize different layouts, ie, by clicking on a special key such as shoft, CTRL, etc, the user gains access to other characters than when not pressing it. This is the case on most keyboards, the most basic example is that when pressing simply the "e" key you get a lowercase "e" but when pressing shift then "e" you get an uppercase "e".
- Be able to download a custom design that can be reimported into the website
- Have the possibility to download a visual representation of the keyboard
- Have access to a documentation on how to use the tool (we planned to do this part but didn't have time to implement it until the deadline)
- Be able to use presets of keyboards


=== Debates and simulation
WIth our group, we tried several existing tools and debated about what aspects of them were intuitive and user-centered or not. We then looked at what we coul improve and add in our software.

== Persona


Now, let's focus on the identified personas that we can roughly divide in two types : makers and hobbyists. The needs are different between all the users so the next section will allow us to explain more precisely the specificities and scenarios for each type.

#grid(columns: (1fr, 1fr), align: center, gutter: 30pt,
  [
    === Maker (Mark)

    #image("images/persona_sophia.png", height: 150pt),

    Mark knows the basics of keyboard protocols and has more professional needs. There are high chances that he has already used similar softwares so they also have a good idea about how this type of software works. As the makers are our principal users, this explains why there will not be a full tutorial for our software. However, we need to implement helping features especially since they might be used to previous softwares that will not function exactly like ours.

  ],
  [
    === General Hobbyist (Gina)

    #image("images/persona_michael.png", height: 150pt),
Gina may custom their keyboards for the first time. As they are new to this task, we propose templates for layout. With these and the tips feature, Gina can understand better the general process of designing a keyboard. A documentation will also be available (in the future if the project continues) to help these users  get used to the software by describing the possible actions they can do and the specificities of possible actions (for instance : how to add a specific layout for when a modifier is pressed).

  ],
  [

    === Gamer Hobbyist (Sarah)

    #image("images/persona_stephan.png", height: 150pt),

    Sarah continually uses their keyboard and, compared to Gina, has a general idea of what type of keyboard they would like to work with. Comfort, speed and easy key combinations are the properties Sarah looks for. She will want to try different layouts to evaluate for herself how much the layouts are usable and efficient for video games. This is why we want to implement an emulator of the layouts created by the users , to allow them to realize the disposition they created and make changes according to the results. this emulator is a goal for the future of our project as we didn't have time to implement it.
  ],
  [
    === Hobbyist with disability (Sam)
    #image("images/persona_lina.png", height: 150pt),

    Some disabilities can limit hand movement and dexterity. Therefore, Sam could be a user of our tool to design a keyboard that would be adapted to their specific needs. To adapt our design to Sam, who might not know much about keyboard layouts and customization, the most important part is to make our website controller compatible (an extension of the project) and offer predesigned configurations to start from a certain basis. A lot of controllers have been created to be adapted to different handicaps, such as the x-box adaptive controller which allows users to create their own controller and therefore adapt it to their impairments. This compatibility would be an extension we add to our website if  we had enough time, but in any case, our tool would allow the creation of more practical keyboards for people with a handicap, whether the keyboard is created by the handicapped person or someone else. The predesigned configurations woere implemented. We are planning on predesigning basic configurations for a predefined number of keys (such as azerty, qwerty, etc).

    One paper @SpecialNeeds worked on adaptative keyboards for people with cerebral palsy to show that adapted keyboards can facilitate the interactions of people atteigned with this degenerative disorder with computers or phones.
  ],
)

== Initial Requirements we focused on

=== Accessability
Can user with disabilities use the website easily?

While the extension to add the possibility to use the website with a controller would greatly improve the accessibility of our website, we tried our best to make it accessible. We used high contrast of white to black to have an easily readable and understandable interface.

=== Efficiency
How quickly can the user perform basic tasks?

To evaluate this, we added a special step in user testing dedicated to this. To maximise the chances that basic tasks could be easily done, we created tools to create a key and move a key with an intuitive design (ie the move key has the aspect of most move key in softwares). We were also inspired by the layout of photoshop for our software, which we believed improves the time necessary to get familiar with the layout of the software for a new user.

=== Customizability
Can the user adapt the interface to their needs?

We created the software so that the canvas's size and the side of the menus can be adapted freely by the user.


=== Satisfaction
How pleasant is the use of the system?

To make the website as pleasant as possible, we added shortcuts with intuitive hot keys (CTRL+C, CTRL+V, SUPPR). We also created a cute mascot for our project which we believe will get the user more engaged with the product and makes it more pleasant to use. Our mascot is names Keybby, and our website KeyB(we took inspiration from the name of the mascot)
