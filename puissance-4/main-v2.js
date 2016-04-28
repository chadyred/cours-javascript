/*=============
JavaScript: puissance 4

Author:  CELLIER Florian <cellier.florian@hotmail.fr>
===============*/

//Objet
function Joueur(nom, couleur) {
	this.nom = nom;
	this.score = 0;
	this.couleur = couleur;

	couleur.ajouterJoueur(this);
} 

function Plateau(couleur, maxX, maxY) {

	this.couleur = couleur;
	this.pions = [];
	this.maxX = maxX;
	this.maxY = maxY;
	this.joueurs = [];
	this.grille = new Array();

	//v1 premier créé, premier qui joue.
	this.currentPlayer = null;
}

//Un pion à une couleur et un joueur à une couleur
function Couleur(couleur) {
	this.couleur = couleur;
	this.joueur = null;
	this.pion = [];
}

function Pion(couleur) {
	this.couleur = couleur;
	this.positionX = -1;
	this.positionY = -1;
}

function Score() {
	this.point = 0;
}

//Méthode ajouter à la classe
Score.prototype.incrPoint = function(){
	 this.point++; 
};

Pion.prototype.move = function(x, y){
	this.positionX = x;
	this.positionY = y;
};

//Ajoute un pion au plateau
Plateau.prototype.ajouterPion = function(pion) {
	this.pions.push(pion);
};

//Ajouter un joueur au plateau
Plateau.prototype.ajouterJoueur = function(joueur) {
	this.joueurs.push(joueur);
};

//Ajouter un joueur au plateau
Couleur.prototype.ajouterJoueur = function(joueur) {
	this.joueur = joueur;
};

// CEtte fonction va retourner la hauteur (la ligne) pour une colonne donnée
Plateau.prototype.checkColonne = function (y) {

	var positionX = 0;

	for (var i = 0; i <= this.pions.length - 1; i++) {
		if(this.pions[i].positionY == y){
			console.log("Un pion dans la colonne! ");
			positionX++;			
		}
	};

	//On vérifie que la position Y n'est pas égale à la postion X + 1
	//MaxY est user friendly
	if(positionX === (this.maxX))
		positionX = -1;

	return positionX;
}

//Fonction qui permet d'intervertir les deux joueurs
Plateau.prototype.switchCurrentPlayer = function () {
	if (this.currentPlayer === this.joueurs[0])
		this.currentPlayer = this.joueurs[1];
	else 
		this.currentPlayer = this.joueurs[0];

}

Plateau.prototype.checkGrille = function () {

	var win = false;

	console.log(this.pions);

	//Boucle du X
	for (var i = this.maxX - 1; i >= 0; i--) {
		this.grille[i] = new Array();

		// BOucle du Y
		for (var j = this.maxY - 1; j >= 0; j--) {

			//Boucle des pions sur le plateau
			for (var k = 0; k < this.pions.length; k++) {

				// On check chaque pions et sa position avec X et Y en cours
				if (this.pions[k].positionX === i && this.pions[k].positionY === j){

					// console.log('Pions de couleur ' + this.pions[k].couleur.couleur +' en position [' + this.pions[k].positionX + '][' + this.pions[k].positionY + ']' );
					this.grille[i][j] = this.pions[k].couleur;
					break;
				}
				else{
					// console.log('Position [' + i + '][' + j + '] vide');
					this.grille[i][j] = -1;
				}

			};
		};
	};

	console.log(this.grille);
	//Boucle du X
	for (var x = 0; x < this.maxX; x++) {

		// BOucle du Y
		for (var y = 0; y < this.maxY; y++) {
			//Horizontal droite


			// if(typeof this.grille[x][y] !== "undefined" && this.grille[x][y].couleur === this.grille[x + 1][y].couleur) {
			// 	if(this.grille[x][y].couleur === this.grille[x + 2][y].couleur) {
			// 		if(this.grille[x][y].couleur === this.grille[x + 3][y].couleur) {
			// 			if(this.grille[x][y].couleur === this.grille[x + 4][y].couleur) {
			// 			  alert('4 idem à droite');
			// 			}
			// 		}
			// 	}
			// }
		};
	};


}



// espace du jeu
var jeu = {
	version : 1,
	author: "flo",
	init : function () {
		//Fonction d'initialisation qui va permettre de créé le plateau, les joeur et leur scores.
		//Leurs jetons seront créé et assigné à ces derniers
		console.log("Bienvenue dans le puissance 4 by " + this.author + " - version " + this.version);

		//On créé le plateau
		var lePlateau = this.plateau.create('grey', 6, 7);

		//On créer les eux couleur pour nos joueurs
		var couleur1 = this.couleurs.create('jaune');
		var couleur2 = this.couleurs.create('rouge');

		//Les joeur s'ajoute également automatiquement à la couleur
		var joueur1 = this.joueurs.create('jean',couleur1);
		var joueur2 = this.joueurs.create('paul',couleur2);

		this.plateau.addJoueur(lePlateau,joueur1);
		this.plateau.addJoueur(lePlateau,joueur2);

		//V1 celui qui commence c'est le premier
		lePlateau.currentPlayer = lePlateau.joueurs[0];

		this.plateau.list(lePlateau);

		// On place ce pion
		// this.plateau.placerPion(5, lePlateau, couleur1);

		alert("Commence " + lePlateau.currentPlayer.nom);
		this.plateau.draw(lePlateau);




	},
	couleurs : {
		create : function (couleur) {
			//Fonction qui permet de créer une couleur
			return new Couleur(couleur);
		},
		show : function (couleur) {
			return console.log("Couleur du joueur " + couleur.joueur.nom);
		}
	},
	pions: {
		create: function (couleur) {
			//Méthode qui permet de créer un pion et le lie à sa couleur
			return new Pion(couleur);
		},
	},
	joueurs : {
		create : function (nom, couleur) {
			// Ajoute un joueurs et lui affecte une quantité de pions déterminé selon la taille du tableau
			return new Joueur(nom, couleur);
		},
		show: function(joueur) {
			//Permet de récupéré les informations sur un joueur
			console.log('========== INFORMATION JOUEUR =============');
			console.log('Nom : ' + joueur.nom);
			console.log('Couleur')
			console.log('========== FIN INFORMATION JOUEUR =============');
		},
		changerJoueur: function (plateau) {
			plateau.switchCurrentPlayer();
		}

	},
	plateau : {
			//Permet de lister les joueurs sur le plateau actuel
		list: function(plateau) { 

			console.log('========== INFORMATION JOUEUR SUR LE PLATEAU =============');
			for (var i = plateau.joueurs.length - 1; i >= 0; i--) {
				jeu.joueurs.show(plateau.joueurs[i]);
			};
			console.log('========== FIN INFORMATION JOUEUR SUR LE PLATEAU =============');

			return plateau.joueurs;
		},
		create: function(couleur, maxX, maxY) {
			return new Plateau(couleur, maxX, maxY);
		},
		addJoueur: function(plateau,joueur) {
			//Permet de lier un joueur au plateau
			plateau instanceof Plateau ? plateau.ajouterJoueur(joueur) : console.alert("Ce n'est pas une instance de plateau");

		},
		show: function (plateau) { 
			//Boucle du X
			for (var i = 0; i < plateau.maxX; i++) {

				// BOucle du Y
				for (var j = 0; j < plateau.maxY; j++) {

					//Boucle des pions sur le plateau
					for (var k = 0; k < plateau.pions.length; k++) {

						// On check chaque pions et sa position avec X et Y en cours
						if (plateau.pions[k].positionX === i && plateau.pions[k].positionY === j)
							console.log('Pions de couleur ' + plateau.pions[k].couleur.couleur +' en position [' + plateau.pions[k].positionX + '][' + plateau.pions[k].positionY + ']' );
						else
							console.log('Position [' + i + '][' + j + '] vide');

					};
				};
			};
			/* Fonction qui va permettre d'afficher le plateau  */
		},
		update: function () { 
			/* Mise à jour du plateau à l'ajout d'un pion*/
		},
		clean: function () { 
			/* Nettoyage du plateau */
		},
		reset: function () {
			//Vide le plateauvaleurElementClickY
		},
		check : function (plateau, y) {
			//La possibilité d'ajouter ou non un pion( colonne plaine)

			return plateau.checkColonne(y);

		},
		//y est la colonne cliquer
		placerPion: function (y, plateau, couleur) {
			//Permet de placer le pion dans la x colonne sur le plateau par un joueur.

				//On créé un pions avec la couleur du joueur
			var pion = jeu.pions.create(couleur);

			//Position du pion dans la colonne
			var positionXPion = this.check(plateau, y);

			if(positionXPion !== -1){
				console.log("All good le pion sera placé en [" + positionXPion + "][" + y + "]");

				// Le pion sera placer en x et Y
				pion.move(positionXPion, y);

				//On place le pion
				plateau.ajouterPion(pion);


			}
			else{
				console.log("Plus de place dans la colonne");
			}

			return pion;


		}, 
		draw: function(plateau) {

			//Initalisation
			var $ = document;
			var container = $.createElement('div');


			console.log(plateau);

			//Custom div
			container.style.backgroundColor = plateau.couleur;
			container.style.border = 'solid black 2px';

			//Taille du plateau selon le nombre de colonne
			container.style.width = 40 * plateau.maxY + 'px';
			container.style.height = 40 * plateau.maxX + 'px';



			//Boucle du Y : ORDRE INVERSE IMORTANT on fait ligne par ligne
			for (var j = plateau.maxX - 1; j >= 0; j--) {
				for (var i = plateau.maxY - 1; i >= 0; i--) {
				// BOucle du X
					
						var box = $.createElement('div');

						box.style.display = 'inline-block';
						box.style.width = '40px';
						box.style.height = '40px';
						box.style.backgroundColor = 'white';
						box.style.borderRadius = '50%';

						box.setAttribute('data-x', j);
						box.setAttribute('data-y', i);

						box.addEventListener('click', function(e) {

							//On récupère la valeur du data y
							var valeurElementClickY = parseInt(e.target.dataset['y']);

							console.log("valeurElementClickY " + valeurElementClickY);

							//On place la position cliqué dans le premiere argument
							var pion = jeu.plateau.placerPion(valeurElementClickY, plateau, plateau.currentPlayer.couleur);

							//On colorise la case
							jeu.plateau.colorierCase(pion);

							//Vérification grille
							jeu.plateau.verifierGrille(plateau);

							//Switch de joueur
							jeu.plateau.interactionTour(plateau);


						});

						container.appendChild(box);				
					};
			};

			$.body.appendChild(container);
		},
		interactionTour : function (plateau) {			

			jeu.joueurs.changerJoueur(plateau);
			alert("A toi de jouer" + plateau.currentPlayer.nom);
		},
		colorierCase : function(pion) {
			// alert('pion.positionX' + pion.positionX + "pion.positionY" + pion.positionY);
			var box = document.querySelector('div[data-x="' + pion.positionX + '"][data-y="' + pion.positionY+ '"]');

			switch (pion.couleur.couleur) {
				case 'jaune':
					box.style.backgroundColor = 'yellow';
					break;
				case 'rouge':
					box.style.backgroundColor = 'red';
					break;
				default:
					box.style.backgroundColor = 'white';
					break;
			}
		},
		//Fonction qui permet de vérifier la grille
		verifierGrille: function(plateau) {
			plateau.checkGrille();
		}


	},
	score :  {
		increment : function (plateau) {
			//Incrémente le score du joueur

		},
		show : function() {
			//Montre l'ensemble des scores
		},
		reset : function () {
			//remet à zéro les scores
		},
		win: function () {
			//Fonction qui vérifie l'alignement des pions à chaque ajout ainsi que

		}, 
		loose: function () {
			//Fonction qui vérifie s'il reste de la place 

		},
	}

};


jeu.init();