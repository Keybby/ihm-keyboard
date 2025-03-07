# Requirements gathering 07/03
## Consigne

See the Milestone description for more details.

For this deliverable, you will prepare a document that addresses the above topics. This document can be in an informal, blog-like style, but it should reveal a deep reflection on the topics below.

1. A brief summary of the project topic.
2. The chosen method to reveal the user’s needs. Do not forget to include a clear reflection on why you chose this or these methods, their limitations, etc.
3. How you carried out this method.
4. What you learned. Think about how this informs important considerations for the future design of the system.
5. At least three persona that you will use to guide the future design of the system.
6. Why did you choose these persona?
7. At least three scenarios that describe various representative tasks for the different users.
8. … including the rationale behind your choice of these scenarios.
9. A list of pertinent usability criteria or principles that will be important to help evaluate the usability of your future system.

You will need these items for the paper prototyping lab exercise.

## Étapes : 
- Design
- Code
- Extension : clavier prédéfini
- Extension : accessibilité manette
- (Extension ou pas ?) : Limitation d'accès des touches disponibles en fonction de l'OS ET de la configuration de langue (ç et 電車 pas possible en même temps)

## Idées : 
- bouton qui fait changer de mode : construction/configuration, changer de couleur en changemlent de mode
- Onglet sur le côté de l’écran pour choisir les layers (avec un + si l’utilisateurs veut ajouter un onglet). Chaque onglet est identifier pasr la combinaison de touche qui permet d’y accéder (ex maj, shift, …)
- Mode émulateur ou on peut cliquer sur les touches qui montre l'usage du clavier (on met son clavier sur l'écran et il teste comme ça)
- Tutoriel lors de la première prise en main de l'utilisateur :    
    - Placement d'une touche
    - Choix de quelle lettre est représentée par la touche
    - Émulation rapide où l'utilisateur clique sur le clavier ce qui affiche la lettre sur un écran
- Pour l'autorisation des entrées : limiter à l'encoding USB (voir l'extension vers UTF-8)
- Pour touches spéciales (genre actions) : proposer une macro genre touche Windows -> Win
- Distinguer la configuration physique et logicielle pour les items.
- differencier les touches actions et les touches caractères    
- on ne s'occupe pas de l'os, ie, on ne vérifie pas si avec l'os l'utilisateur pourrait taper tous les caractère souhaités, en extension on pourra éventuellement lui faire sélectionner azerty etc
- dans l'émulateur, si une action est pressée on affiche (x action a été appuyée/effectuée), si c'est une lettre ou caractère on l'affiche juste- 
- ajouter touche layer qui indique vers quelle layer tu switch
