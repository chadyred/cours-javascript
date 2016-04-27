$ = document;

var moveRect = function() {

	var sq = $.getElementById('square');

	console.log(sq);

	sq.addEventListener('click', function (e) {

		e.target.style.marginLeft = e.offsetX + "px";
		e.target.style.marginTop = e.offsetY + "px";


		//C'est un tableau qui contient l'ensemble des propriétés CSS
		console.log(e.target.style);
	});
}

var detectKey = function () {
	var konami = $.getElementById('konami');

	var keyPress = [];
	var konamiKeys = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

	$.addEventListener('keyup', function(e) {
		konami.innerHTML = e.keyCode;
		//38 38 40 40 37 39 37 39 66 65
		keyPress.push(e.keyCode);
		
		if (keyPress.length >= konamiKeys.length - 1) {
			console.log('Test keyPress' + keyPress);

			//R2initilisation
			var j = konamiKeys.length - 1;

			for (var i = keyPress.length - 1; i > keyPress.length - 10; i--) {
				
				j--;
				console.log('j : ' + j);
				if(keyPress[i] == konamiKeys[j])
					console.log('Match');
				else{
					console.log('Loose, recommence !');
					break;
				}

				//On est pas sortie de la boucle et on est au dernier test:
				// On test sa validité
				if(j === 0 && keyPress[i] == konamiKeys[j])
					win();
			};	
		}
	});


}

var win = function () {
	swal("Good job!", "You time is save!", "success");
}