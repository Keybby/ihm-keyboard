=  Final Report

#place(
  top + center,
  scope:"parent",
  float:true,
    text(30pt)[Keyboard maker project],
)
#place(
  top + center,
  scope:"parent",
  float:true,
    text(25pt)[Low fidelity prototype],
)
#place(
  top + center,
  scope:"parent",
  float:true,
    text(20pt)[_Nicolas, Antonin, Eva et Leïla _],
)

#show link: set text(fill: blue)
#show link: underline

#set heading(numbering: "1.")
= Introduction

The goal of our team was to design a user-centered tool to design customized keyboards. There are several reasons why someone might want a customized keyboard : physical impairment, dactylography, optimizing playing video games, ...

While this community is quite niche as most people are using basic keyboards (QWERTY, AZERTY, etc), our site could have interested potential users as shows the existence of specialized shops and forums on the subject of keyboard customization.

= The User

== Identifying the user needs

=== Reddit : Survey on desired features
To identify the user needs, we decided to directly ask people that fitted the profiles of potential users : people that want to customize their keyboards, wether it is for gaming, as a hobby,  professionnally or because of an impairment. To start a discussion with them, we posted on subreddits focalised on this activity and mechanical keyboards, ie r/MechanicalKeyboards and r/olkb. We chose this subreddits because they were focused on keyboards discussions, and since keyboard customization is quite niche, we couldn't just ask the general population as they would probably not be the main users of our site. Therefore, we went to ask the people that would most likely use it, and posting on public forums can : 
- gather a lot of input since there are a lot of people on these subreddits. r/MechanicalKeyboards has 1.3 Million users and r/olkb has 62k users.
- The posts stay on for a long time so we could gather more input has time passes if people fall on our post
- makes reaching out to niche communities easier

The post we made on #link("https://www.reddit.com/r/olkb/comments/1jazgx5/usability_survey_for_keyboard_prototyping_tools/")[r/olkb] we got 4 users input, and the redditors gave us examples and ressources. The main points that the user desired were : 

- #link("https://www.keyboard-layout-editor.com/")[Keyboard Layout Editor(KLE)] was considered pretty much perfect by an editor as it allowed to change the style, colors, etc. One problem for this user was that it wasn't easy to use on mobile, and it doesn't provide key statistics per language, so this would set our tool appart. Here are some examples of what can be achieved using this site : #link("https://www.keyboard-layout-editor.com/#/gists/13189415e484873668d1953f8338ecd4")[1], #link("https://www.keyboard-layout-editor.com/#/gists/91301391175763959e944a60978ef0d3")[2], #link("https://www.keyboard-layout-editor.com/#/gists/76d41d783f66ed50292cc7b7d057dac7")[3], #link("https://www.keyboard-layout-editor.com/#/gists/77fc8649d52df8d7a5a039c1afd49564")[4]. Another user however pointed out that this tool doesn't handle curves or non-standard keys, as can be seen on this #link("https://www.keyboard-layout-editor.com/#/gists/97774da6d78d071ac0aa955e92da9219")[example] when attempting to reproduce a #link("https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/MS_Natural_Keyboard_Pro.JPG/1280px-MS_Natural_Keyboard_Pro.JPG")[MS Natural Original Keyboard]. Another issue pointed out with this tool is that KLE uses two versions of JSON, one of which is non standard which can cause issues with 3rd party tools. Also, there is no snap to grid functionnality allowing the user to automaticalluy align the keys together. Finally, the image exports is considered not great, developpers were working on an SVG exports that was never finished.
- Integrating Swill's laser cutouts Swill is a web-based tool that generates SVG files for laser cutting keyboards plates and cases.
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
- Change the colors of the keys to make them more distinguishable from one another
- Label the keys as they wish, including special character such as an arrow, the label for the enter key, etc.
- be able to customize different layouts, ie, by clicking on a special key such as shoft, CTRL, etc, the user gains access to other characters than when not pressing it. This is the case on most keyboards, the most basic example is that when pressing simply the "e" key you get a lowercase "e" but when pressing shift then "e" you get an uppercase "e".
- downloading a custom design that can be reimported into the website
- The possibility to download a visual representetion of the keyboard
- A documentation on how to use the tool 
- Presets of keyboards




== Persona and system requirements

Now, let's focus on the identified personas that we can roughly divide in two types : makers and hobbyists. The needs are different between all the users so the next section will allow us to explain more precisely the specificities and scenarios for each type.

=== Maker

The makers know the basics of keyboard protocols and have more professional needs. There are high chances that they have already used similar softwares so they also have a good idea about how this type of software works. As the makers are our principal users, this explains why there will not be a full tutorial for our software. However, we need to implement helping features especially since they might be used to previous softwares that will not function exactly like ours. 

=== General Hobbyist

These users may custom their keyboards for the first time. As they are new to this task, we propose templates for layout. With these and the tips feature, the hobbyists can understand better the general process of designing a keyboard. A documentation will also be available to help these users  get used to the software by describing the possible actions they can do and the specificities of possible actions (for instance : how to add a specific layout for when a modifier is pressed).

=== Gamer Hobbyist

Gamers continually use their keyboard and, compared to the previous hobbyists, have a general idea of what type of keyboard they would like to work with. Comfort, speed and easy key combinations are often the properties gamers look for. They will want to try different layouts to evaluate for themselves how much the layouts are usable and efficient for video games. This is why we will implement an emulator of the layouts created by the users, to allow them to realize the disposition they created and make changes according to the results.

=== Hobbyist with disability (extension)

Some disabilities can limit hand movement and dexterity. Therefore, these could be users of our tool to design a keyboard that would be adapted to their specific needs. To adapt our design to these users who might not know much about keyboard layouts and customization, the most important part would be to make our website controller compatible and offer predesigned configurations to start from a certain basis. A lot of controllers have been created to be adapted to different handicaps, such as the x-box adaptive controller which allows users to create their own controller and therefore adapt it to their impairments. This compatibility would be an extension we add to our website if  e had enough time, but in any case, our tool would allow the creation of more practical keyboards for people with a handicap, whether the keyboard is created by the handicapped person or someone else. The predesigned configurations would also be an extension if the time allows it. We are planning on predesigning basic configurations for a predefined number of keys (such as azerty, qwerty, left-handed adapted keyboard, etc).

One paper @SpecialNeeds worked on adaptative keyboards for people with cerebral palsy to show that adapted keyboards can facilitate the interactions of people atteigned with this degenerative disorder with computers or phones.

== Evaluation of the usability of the software for each Persona

To test the usability, we'll ask several people to implement the same keyboard, the complexity and layout of which will difer according to the persona for which we are testing the usability.

=== Maker

No idea, maybe a random of the three other would not be absurd.

=== General Hobbyist

For this profile, we chose to focus the test on keyboard efficient for dactylography.

To this end, we'll ask a student to configure a part of the characorder : 

#figure(image("images/charachorder.png", width: 80%),)

TODO : make a file that we will actually give people

=== Gamer hobbyist

For this profile, we chose to test a custom gamer keyboard layout, that will be fixated on the closeness of certain keys that help with speed and prevent the player from losing time moving their hands to much to do an action.

We have found that a gaming layout recommended is the colemak layout. Therefore, we asked our testers to implement it : 

#figure(image("images/colemak_keyboard.png", width: 80%),)

=== Hobbyist with a disability
For this persona, we will test the following keyboard design. We chose this design because with disability, people might have trouble accessing a lot of keys, so we choose a keyboard with a small number of keys but a lot of layers.

People with disabilities might not be using letters and using voice dictation as one reddit user mentionned. However, they need the keyboard to allow them to move or correct the text and do text formatting in in limited number of keys. According to #link("https://webaim.org/techniques/keyboard/")[WEBAIM], you'll find in this link the most common interactions with non characters keys and therefore the most important to configure on this test keyboard.

#figure(image("images/Tab.png", width: 80%),)

=== Measuring the usability and success criteria

To measure the usability and success criteria, we will proceed in two phases : 
- The first one will be during the use of the software : we will invite the participant to express all feelings and impressions they have toward the tool, wether for instance something is efficient, intuitive or not, if they have trouble finding a certain tool etc. During this time, we'll also evaluate the success criteria. According to each layout we will ask them to do, there will be different criteria as described before (to do), and we will evaluate them based on if the user successed in doing the task or not.
- The second part will be a post usage evaluation. We will ask the questions given before according to what layout we asked them to implement (to do according to the layout but basically if the tools were easy to use, if they found them easily etc)

= The design

To choose our design, we first discussed what were in our opinion the most important aspects of our software, what would be the essential tools and how to implement them. After discussing these points, we each drew our first sketches to compare our visions of the software after agreeing on these points.

#figure(image("images/3sketch.png", width: 80%),)

After discussing these sketches, we agreed 

= The prototype

#link("https://github.com/Stroumpfgrognon/ihm-keyboard")[Our git repository]

= The evaluation


#bibliography("bibli.bib")