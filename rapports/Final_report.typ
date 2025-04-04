=  Low fidelity prototype

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

= The User

To identify the user needs, we decided to directly ask people that fitted our personnas : people that want to customize their keyboards, wether it is for gaming, as a hobby or professionnally. To start a discussion with them, we posted on subreddits focalised on this activity and mechanical keyboards, ie r/MechanicalKeyboards and r/olkb.

The post we made on #link("https://www.reddit.com/r/olkb/comments/1jazgx5/usability_survey_for_keyboard_prototyping_tools/")[r/olkb] was the one with the most answers, and the redditors gave us examples and ressources. The main points that the user desired were : 

- #link("https://www.keyboard-layout-editor.com/")[Keyboard Layout Editor(KLE)] was considered pretty much perfect by an editor as it allowed to change the style, colors, etc. One problem for this user was that it wasn't easy to use on mobile, and it doesn't provide key statistics per language, so this would set our tool appart. Here are some examples of what can be achieved using this site : #link("https://www.keyboard-layout-editor.com/#/gists/13189415e484873668d1953f8338ecd4")[1], #link("https://www.keyboard-layout-editor.com/#/gists/91301391175763959e944a60978ef0d3")[2], #link("https://www.keyboard-layout-editor.com/#/gists/76d41d783f66ed50292cc7b7d057dac7")[3], #link("https://www.keyboard-layout-editor.com/#/gists/77fc8649d52df8d7a5a039c1afd49564")[4]. Another user however pointed out that this tool doesn't handle curves or non-standard keys, as can be seen on this #link("https://www.keyboard-layout-editor.com/#/gists/97774da6d78d071ac0aa955e92da9219")[example] when attempting to reproduce a #link("https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/MS_Natural_Keyboard_Pro.JPG/1280px-MS_Natural_Keyboard_Pro.JPG")[MS Natural Original Keyboard]. Another issue pointed out with this tool is that KLE uses two versions of JSON, one of which is non standard which can cause issues with 3rd party tools. Also, there is no snap to grid functionnality allowing the user to automaticalluy align the keys together. Finally, the image exports is considered not great, developpers were working on an SVG exports that was never finished.
- Integrating Swill's laser cutouts Swill is a web-based tool that generates SVG files for laser cutting keyboards plates and cases.
- Integrating KLE-render : a tool that  that a KLE layout and generates a 3D rendering of the keyboard.
- Using #link("https://openscad.org/")[OpenSCAD] for the mechanical design : hard to use for basic tasks but there are Python extensions to make it easier to use, but not as easy as SolidWorks. The user mentionning this tools would like a computer-aided design tool for Linux that is visual.
- One user mentioned computeritis (an ailment caused by the use of computers (pain in some fingers, etc)) as a cause for wanting to personnalise their keyboard. This user writes mostly using dictation mode and voice commands but for corrections, some keys (like backspace, etc) are still needed. This user uses a lot of chords (pressing several keys to do an action), this increases the number of actions they can do with a small number of keys. They often need to reprogramm their keyboard for specific usage, and a visual tool would be practical since it would be easier to remember and use as customized keyboards don't have the characters sent to the computers printed on them by default. This user also indicated that some combination of keys were easier for them to use relating to their placement and the Repetitive Strain Injury (or computeritis).

== The design


== The prototype


== The evaluation
