#import "@preview/note-me:0.3.0": admonition

// FIXME: add more context:
// -  What are the pain points of keyboard creators
// - clarify that it is not only videogames
// - mostly for *custom* keyboards. A lot of hobbyist buy keyboards and then want to customize the layout.

#admonition(title: "Disclaimer", icon-path: "icons/report.svg", color: color.orange)[
  Our tool has been created for a niche community: Keyboard hobbyists.

  Before we dive into the user requirements and the design, let's take a trip in the world of custom keyboards.
]

== Custom keyboards

For a specific category of people, classical keyboards suck. The keyboards that are included in your laptop are inefficient, not ergonomic, and unpleasant to use.
For some of these people, changing the layout (The mapping from keys to symbols) is enough #footnote[A great overview for french layouts: https://ergol.org/alternatives]. But for others, the only way to fix the problems of current keyboards is to buy a custom one.

#figure(caption: "A keyboard kit in a specialized online shop", image("images/42keebs.png", width:80%))


Buying, doing the setup and using such a keyboard is a time-consuming investment. We will refer to such people as _Keyboard hobbyists_.
_Keyboard hobbyists_ form a supportive community, and they are mainly active on discord, github #footnote[https://github.com/help-14/mechanical-keyboard?tab=readme-ov-file#tutorials] and Reddit #footnote[https://www.reddit.com/r/MechanicalKeyboards/wiki/index/].

#pagebreak()

Very common activities for keyboard hobbyists include:
- chosing a kit to buy
- soldering the components of the keyboard
- thinking about the ideal layout for the keyboard #footnote[There is a lot of theory in this domain: https://workmanlayout.org/#back-to-the-drawing-board]
- configuring the keyboard using special firmware #footnote[https://docs.qmk.fm/]

It is also quite common for keyboard hobbyist to try to make their own custom mechanical keyboard. It is of course a lot more time consuming, but they are resources online to get started.

For some of these activities, specialized tools exist (see @kle).

However, we identified a lack of a unified keyboard creation app. Such an app would allow the maker to create its keyboard geometry, to propose a custom layout. It would also allow the final user to import the keyboard, change the layout, and export a firmware configuration from it.

#admonition(title: "A brainstorming app", color: color.blue, icon-path: "icons/light-bulb.svg")[
  The main advantage of our app is to *materialize* the idea of the keyboard maker. By forcing him to express his keyboard idea in a concrete way, it will help him design the keyboard faster.
  It can also be used for collaborative keyboard design, and for teaching the fundamental of how custom keyboard work.
]

This is why we chose to create it: a *Unified keyboard maker app*.

The first step is to have a deeper understanding of the user, before collecting our requirements.
