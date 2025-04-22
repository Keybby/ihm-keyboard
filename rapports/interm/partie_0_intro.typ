#import "@preview/prequery:0.1.0"

#align(center, [
#set text(size: 30pt)
Projet configuration de claviers

#set text(size: 20pt)
_Nicolas, Antonin, Eva et Leïla _
])


Notre projet consiste en la création d'un site internet permettant de tester facilement plusieurs configurations de claviers. En fonction du nombre de touches, de si l'utilisateur est gaucher ou droitier, nous souhaiterions proposer des claviers par défaut (l'utilisateur pourra par la suite changer chaque touche manuellement).

Notre but est de permettre à tout le monde de pouvoir configurer son clavier facilement et que la configuration soit intuitive et claire pour l'utilisateur. Certains outils existent déjà mais ont des bugs ou ne sont pas très intuitifs.

Bien que la majorité des possesseurs de claviers utilisent des claviers classiques (ie azerty, qwerty, etc), il existe beaucoup de personnes souhaitant configurer et personnaliser leurs claviers, comme en témoigne l'existence de boutiques spécialisées ou de forum sur le sujet. Une partie de cette communauté souhaite posséder des claviers optimisés pour la dactylographie ou pour jouer à des jeux vidéos, cependant ce type de clavier peut également être très utile pour les personnes en situation de handicap. Par exemple, si une personne a une main possédant beaucoup moins de force que l’autre, la disposition par défaut des touches pourrait ne pas être optimisée.

Quelques exemples de claviers optimisés :

#figure(grid(columns: 2, row-gutter: 2mm, column-gutter: 1mm,

  image("images/clavier1.jpg"), image("images/clavier2.png")),

  caption: "Deux exemples de claviers ergonomiques"

)
