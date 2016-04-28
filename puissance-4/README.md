Puissance 4
===========

L'objectif est d'aligner 4 pions sur une grille comptant 6 rangées et 7 colonnes.

- Deux joueurs s'affronteront.
- On place un pions dans la colonne de son choix
- Déplacement du pions dans la colonne sur la position la plus basse possible.
- Le gagnant sera celui qui aligne 4 pions verticalement  horizontalement ou en diagonale.
	- Plus de place? Personne ne gagne.
	- 4 jetons aligné, le jeux est terminé, on vide le plateau.

Joueur: 
	- nom
	- Score
	- Pions

Plateau: 
	- minX
	- minY
	- maxX
	- maxY
	- couleur
	- Pions

Pion:
	- couleur
	- positionX
	- positionY

Score:
   - point

Gestion de la couleur: 
	- Création
	- Liaison au jeton
	- Liaison au joueur

Gestion du joueur:
	- Saisie son nom
	- Place un pion dans la grille (en cliquant sur la colonne)
	- Visualiser son score et celui de l'adversaire
	- Gagner s'il align 4 pions

Objet métier "Ajout du pion sur le plateau":
	- On a le plateau, une quantité de pion en entré, dans le processus on a le joueur
	qui à la main et le plateau qui va recevoir les pions. Il a un pion de couleur. Il place un pion, la grille ajoute ce pions dans la plus basse position de la colonne
	- En sortie, on a la grille qui est enrichie d'un nouveau pions. 
	- Si le joueur gagne, son score augmente de un.



