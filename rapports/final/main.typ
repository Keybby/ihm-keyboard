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
    text(25pt)[Final Report],
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

#include "0_intro.typ"

#pagebreak()

= The User
#include "1_requirements.typ"

#pagebreak()

= Evaluation methodology

#include "2_evaluation.typ"

#pagebreak()

= The design

#include("3_design.typ")


#pagebreak()

= The prototype


#include("4_software.typ")

= The evaluation


#bibliography("bibli.bib")
