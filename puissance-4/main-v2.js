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

//Fonction qui vérifie si dans la colonne il reste de la place et si oui, retourne
//le x et retourn la Y position
Plateau.prototype.checkColonne = function (x) {

	var positionY = 0;

	for (var i = 0; i <= this.pions.length - 1; i++) {
		if(this.pions[i].positionX === x){
			console.log("Un pion dans la colonne! ");
			positionY++;			
		}
	};

	//On vérifie que la position Y n'est pas égale à la postion X + 1
	//MaxY est user friendly
	if(positionY === (this.maxY ))
		positionY = -1;

	return positionY;
}

Plateau.prototype.switchCurrentPlayer = function () {
	if (this.currentPlayer === this.joueurs[0])
		this.currentPlayer = this.joueurs[1];
	else 
		this.currentPlayer = this.joueurs[0];

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
		this.plateau.placerPion(5, lePlateau, couleur1);

		this.plateau.show(lePlateau);

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
			//Vide le plateau
		},
		check : function (plateau, x) {
			//La possibilité d'ajouter ou non un pion( colonne plaine)

			return plateau.checkColonne(x);

		},
		placerPion: function (x, plateau, couleur) {
			//Permet de placer le pion dans la x colonne sur le plateau par un joueur.

				//On créé un pions avec la couleur du joueur
			var pion = jeu.pions.create(couleur);


			var positionYPion = this.check(plateau, x);

			if(positionYPion !== -1){
				console.log("All good le pion sera placé en [" + x + "][" + positionYPion + "]");

				// Le pion sera placer en x et Y
				pion.move(x, positionYPion);

				//On place le pion
				plateau.ajouterPion(pion);


			}
			else{
				console.log("Plus de place dans la colonne");
			}

			return pion;


		}, 
		win: function () {
			//Fonction qui vérifie l'alignement des pions à chaque ajout ainsi que

		}, 
		loose: function () {
			//Fonction qui vérifie s'il reste de la place 

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
			container.style.width = 40 * plateau.maxX + 'px';
			container.style.height = 40 * plateau.maxY + 'px';



			//Boucle du Y : ORDRE INVERSE IMORTANT on fait ligne par ligne
			for (var i = plateau.maxY - 1; i >= 0; i--) {
				// BOucle du X
				for (var j = plateau.maxX - 1; j >= 0; j--) {
					
						var box = $.createElement('div');

						box.style.display = 'inline-block';
						box.style.width = '40px';
						box.style.height = '40px';
						box.style.backgroundColor = 'white';
						box.style.borderRadius = '50%';

						box.setAttribute('data-x', j);
						box.setAttribute('data-y', i);

						box.addEventListener('click', function(e) {
							//On récupère la valeur du data Y
							var valeurElementClickX = e.target.dataset['x'];

							//On place la position cliqué dans le premiere argument
							var pion = jeu.plateau.placerPion(valeurElementClickX, plateau, plateau.currentPlayer.couleur);

							//Switch de joueur
							jeu.plateau.interactionTour(plateau);

							jeu.plateau.colorierCase(pion);

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
			alert('pion.positionX' + pion.positionX + "pion.positionY" + pion.positionY);
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
		}


	},
	score :  {
		increment : function (joueur) {
			//Incrémente le score du joueur
		},
		show : function() {
			//Montre l'ensemble des scores
		},
		reset : function () {
			//remet à zéro les scores
		}
	}

};


jeu.init();