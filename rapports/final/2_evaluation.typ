
// FIXME: explain our methodology before diving in the details.
// - focus on personnas
// - since

== Preface on evaluations

At the beginning of the project, we wanted to make different interpretive evaluations for each personna. 
We sent a form, using Google Forms, on Reddit (for the maker and with disability personnas) and to some friends (for the hobbyist and gamer personnas) to know their availability but only five persons answered. 
There were not enough participants to make evaluations for each personna. This is why we created an evalutation in three steps, the same for every participant.

However, we did take into account that the interface was designed for four different personnas.

== Focus on each personna

Our interface is mainly designed for the maker personna so we based our evaluation on that. It does not mean that we did not evaluate aspects more related to other personnas.

=== Maker

As said in the previous part, the redditors that gave us examples of tools (they represent the makers) higlighted the interface's ease of use, the varied customization of the keys and a good visual. We decided that the first step of the evaluation would be the timed copy of a keyboard presented later. This allows us to see how much time is needed to make a simple keyboard with two layers, and which part of the process is the less efficient in terms of choice of interaction. 

We had one participant for this personna.

=== General hobbyist

For this personna, it is often the first time they use an interface to customize a keyboard. Timing the creation of a specific keyboard allows us to know where the interface is not understandable enough. The difficulty to know which action is doable is linked as much to the visual clues as to the type of interaction chosen in the design. This is why for the second step of the evaluation, we made a think-aloud with a predefined list of tasks. It allows us to know more specifically which interaction exactly is lacking in intuitivity.

We had one participant for this personna.

=== Gamer hobbyist

There are high chances that gamer hobbyists know which type of keyboard they want. So it is also important for them to have an interface that is easy and fast to use. It is often that gamers are used to keyboard shortcuts so we needed to know if the result of our shortcuts was intuitive for them. This was moslty tested during the second step.

We had two participants for this personna.

=== Hobbyist with a disability

As said before, this personna was an extension so we did not test if our interface is compatible with controllers. However, we designed the interface so that the colors are distinct. The choice of colors will be presented later, but we made sure to have contrast between the background and the text. We made sure of this choice with the third step of the evaluation, which was a questionnaire, using Google Forms.

We had one participant for this personna.

== Methodology and setting

// TODO: detail
// Timing creation of a specific keyboard
// Think-aloud during a determined list of tasks
// Questionnaire

We had five participants in total for this evaluation. For each participant, we gave them the same document (TODO link here) that explains the whole evaluation and gives the link to the interface and the questionnaire. As one participant said to us that they did not have much time, we estimated the time for each step. This allowed the participant to know which step they want to do.
The evaluation was in French because our participants were, and the order of the steps was as follows:

- Timing the creation of a specific keyboard
- Think-aloud during a determined list of tasks
- Questionnaire after testing the interface

For the two first steps, we asked the participants if they wanted to share their screen and they all agreed.

=== Timing a keyboard's creation

This step was mandatory and we estimated that it would take at most ten minutes. The mean time for creating this keyboard (TODO include image here) was 3min 57s. The minimum time, 1min 37s, was made by the redditor who already used this type of tool. This means that our interface is not so far away from existing tools, in terms of interactions. These latters are recognizable by the users.
The creation of the keyboard includes the most used commands : create keys, move them, add them a value, create a layer linked to a modifier.

The goal of this step was to see which actions were more intuitive and how much participants understand the process of customizing a keyboard without help.
This is how for example we realized that the concept of layers and activation keys was not clear enough in the interface.

=== Think-aloud

We estimated that it would take at most twenty minutes. In reality, some of the participants had a lot to say so it took for them thirty to forty minutes.
The predefined list of tasks englobed all the possible actions of the interface, as some of them can be skipped during th creation of some keyboards.
The list was divided as follow:

- Concept of a (physical) key: create a key, modify its geometry, give it the value "Ctrl + Alt"
- Visual of the keyboard: create another key at the right, select the group, copy and past the copy below
- Concept of a layer: add a layer with the activation key "Ctrl + Alt", rename the layer "test"
- Multiple values, replacing value for a key: replace the value of the key "Ctrl + Alt" with "A"
- Finishing the work: export the JSON, select all, delete all

The goal was to hear the participants' reactions face to our interface's design. This steps helped us to know better why some interactions are not perceived as they are.
Unlike the previous step, participants were encouraged to talk during the process. They gave us new ideas, showed us some bugs we did not see before, and emphasised on what should be improved. For some problems, all the particpants agreed, like the lack of visual clues about the current state of the interface.

=== Questionnaire

We estimated that it would take at most ten minutes. After the participants tested the interface, we gave us this questionnaire (TODO link here) to have their opinion about points we did not agree on in the team.
Our two main problems when we did the evaluations were about the tutorials/tips and the wanted intercation to add or replace a key's value.

This questionnaire was more for us to be sure of some interactions before implementing them rather than confirming our design.

== Evaluation Results

=== Observations

First of all, the evaluation showed us several bugs we had this time. The right-click behaved unexpectedly and interfered with their tasks, resizing the frame and zooming it had an unexpected behaviour and the snap function did not function the same all the time. We fixed these bugs as soon as possible.

Then, the participants pointed out some problems: 

- The system’s state was unclear. Participants wanted a text area indicating the current mode and available actions.
- There was a lack of distinction between "Export SVG" and "Export." 
- Two participants described the colors as “dull” and not distinct enough to indicate states (possibly explaining the demand for explanatory text).
- Renaming a layer wasn’t seen as an available option.
- The method for selecting activation keys for a layer was misunderstood. Participants thought they had to type on their keyboard instead of selecting keys. They requested explanatory text for this step

Finally, some of the ideas of the participants were implemented, like:

- Add Clear and Delete tools, just like Move and Create.
- Let users manually edit key's geometry values.

=== Answers of the questionnaire

Four participants answered the questionnaire. Unfortunately, questions about multiple values for a key divided the participants in two. So we decided to keep our current design
Participants wanted tips, but once again half of them wanted them only once, and the other half wanted the tips to be shown multiple times. However, the comments and their oral reactions highlighted the need to know the current state of the system.
Also, the participants were not aware of the zoom function, result that we were expecting.

=== Design changes

Following these results, we made some changes in our design.

The first thing was to add tips and more feedbacks. Tips are given according to the advancement of the user in the interface. For example, if the frame is empty, the tip will guide the user to create a new key.
The user can know the action of a tool when they hovers it. Indeed, a text appears below the tool.

We changed the text "Export" to "Export JSON" and added a description of each format to make sure even a new hobbyist can understand our interface.

Thanks to the idea of on the participants, we put a icon of pencil next to a layer's name to indicate to users that it can be edited (TODO include layername.jpg here)

Finally, we implemented the ideas listed above. We have now more tools than just Create and Move. This allows to have more intercations for a same action and so to have a more flexible interface.
The user can now change a key's geometry by writing it, instead of using the slider. This allows more compatibility for a future version, if we want our interface to be compatible with 3D printers or other tools.

== New requirements

These evaluations allowed us to understand better the requirements we needed to improve.

=== Learnability

The design prioritizes learnability by making it easy for users to perform essential tasks from their first interaction. To support this, intuitive hotkeys and shortcuts have been implemented, enabling users to quickly grasp the interface and streamline their workflow without requiring extensive guidance.

=== Error Prevention and Recovery

To minimize user errors and facilitate smooth recovery, the system includes several thoughtful features. 
A snap grid assists with accurate key placement, reducing alignment mistakes, and users have the ability to suppress keys, giving them control over layout adjustments.

=== Feedback

The interface actively communicates with users through clear and immediate feedback. Indeed, color signals provide visual cues when inputting key values, enhancing clarity and reducing uncertainty.




// FIXME: move to another part ?
// These criteria where not really evaluated
//
// Memorability : When users return after a period of not using the tool, how easily can they reestablish proficiency?
// -> Hasn’t been verified due to lack of time
//
// Compatibility: use this tool to import from and export to a wide variety of formats
