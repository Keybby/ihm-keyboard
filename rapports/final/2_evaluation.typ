
// FIXME: explain our methodology before diving in the details.
// - focus on personnas
// - since

== Focus on each personna

// TODO: make the detail of each personna lighter and put the images in the following section ?

To test the usability, we'll ask several people to implement the same keyboard, the complexity and layout of which will difer according to the persona for which we are testing the usability.

=== Maker

No idea, maybe a random of the three other would not be absurd.

=== General Hobbyist

For this profile, we chose to focus the test on keyboard efficient for dactylography.

To this end, we'll ask a student to configure a part of the characorder :

#figure(image("images/charachorder.png", width: 80%),)

// TODO : make a file that we will actually give people

=== Gamer hobbyist

For this profile, we chose to test a custom gamer keyboard layout, that will be fixated on the closeness of certain keys that help with speed and prevent the player from losing time moving their hands to much to do an action.

We have found that a gaming layout recommended is the colemak layout. Therefore, we asked our testers to implement it :

#figure(image("images/colemak_keyboard.png", width: 80%),)

=== Hobbyist with a disability
For this persona, we will test the following keyboard design. We chose this design because with disability, people might have trouble accessing a lot of keys, so we choose a keyboard with a small number of keys but a lot of layers.

People with disabilities might not be using letters and using voice dictation as one reddit user mentionned. However, they need the keyboard to allow them to move or correct the text and do text formatting in in limited number of keys. According to #link("https://webaim.org/techniques/keyboard/")[WEBAIM], you'll find in this link the most common interactions with non characters keys and therefore the most important to configure on this test keyboard.

#figure(image("images/Tab.png", width: 80%),)

== Methodology and setting

// TODO: detail
// Timing creation of a specific keyboard
// Think-aloud during a determined list of tasks
// Questionnaire

To measure the usability and success criteria, we will proceed in two phases :
- The first one will be during the use of the software : we will invite the participant to express all feelings and impressions they have toward the tool, wether for instance something is efficient, intuitive or not, if they have trouble finding a certain tool etc. During this time, we'll also evaluate the success criteria. According to each layout we will ask them to do, there will be different criteria as described before (to do), and we will evaluate them based on if the user successed in doing the task or not.
- The second part will be a post usage evaluation. We will ask the questions given before according to what layout we asked them to implement (to do according to the layout but basically if the tools were easy to use, if they found them easily etc)



== Evaluation Results

// TODO:
// - timing
//    1 min30 - 7 min (mean: 3min57)
// - Several bugs detected


== New requirements

// TODO:
// Learnability : How easy is it for users to accomplish certain tasks the first time they encounter the design?
// -> intuitive hot keys and shortcuts put in place
//
// Error Prevention and Recovery : How well does the system prevent user errors, and how easily can users recover from them?
// -> Snap grid, allow user to suppress keys, warns when no activation key has been defined
//
// Feedback : Does the system provide feedback to inform the user on what is happening?
// -> color signals (when inputting keys), warning sign when no activation key has been defined

// FIXME: move to another part ?
// These criteria where not really evaluated
//
// Memorability : When users return after a period of not using the tool, how easily can they reestablish proficiency?
// -> Hasn’t been verified due to lack of time
//
// Compatibility: use this tool to import from and export to a wide variety of formats
