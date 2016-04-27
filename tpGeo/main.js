
	if(navigator.geolocation) {
		survId = navigator.geolocation.getCurrentPosition(maPosition,erreurPosition);
		//SurvId pourra être utilisé pour arrêter la géolocalisation
	    // survId = navigator.geolocation.getCurrentPosition(maPosition,erreurPosition);
	} else {
	    alert("Ce navigateur ne supporte pas la géolocalisation");
	}

 map = null;

//Initialisation de la map
// @return : map
function initMap() {
	// Position par défaut (Châtelet à Paris)
	var centerpos = new google.maps.LatLng(48.579400,7.7519);

	// Options relatives à la carte
	var optionsGmaps = {
	    center:centerpos,
	    mapTypeId: google.maps.MapTypeId.ROADMAP,
	    zoom: 15
	};
	// ROADMAP peut être remplacé par SATELLITE, HYBRID ou TERRAIN
	// Zoom : 0 = terre entière, 19 = au niveau de la rue
	 
	// Initialisation de la carte pour l'élément portant l'id "map"
	var map = new google.maps.Map(document.getElementById("map"), optionsGmaps);

	return map;
}

function maPosition(position) {

 var map = initMap();

  var infopos = "Position déterminée :\n";
  infopos += "Latitude : "+position.coords.latitude +"\n";
  infopos += "Longitude: "+position.coords.longitude+"\n";
  infopos += "Altitude : "+position.coords.altitude +"\n";
  document.getElementById("infoposition").innerHTML = infopos;

  
	  
	// .. et la variable qui va stocker les coordonnées
	var latlng;

    // Un nouvel objet LatLng pour Google Maps avec les paramètres de position
    latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
    // Ajout d'un marqueur à la position trouvée
    var marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title:"Vous êtes ici"
    });
    
    // Permet de centrer la carte sur la position latlng
    map.panTo(latlng);
}

// Fonction de callback en cas de succès
function surveillePosition(position) {
    var infopos = "Position déterminée :\n";
    infopos += "Latitude : "+position.coords.latitude +"\n";
    infopos += "Longitude: "+position.coords.longitude+"\n";
    infopos += "Altitude : "+position.coords.altitude +"\n";
    infopos += "Vitesse  : "+position.coords.speed +"\n";
    document.getElementById("infoposition").innerHTML = infopos;
}

// Annule le suivi de la position si nécessaire.
function stopperSurveillance(survId) {
	navigator.geolocation.clearWatch(survId);
}

// Fonction de callback en cas d’erreur
function erreurPosition(error) {
    var info = "Erreur lors de la géolocalisation : ";
    switch(error.code) {
    case error.TIMEOUT:
    	info += "Timeout !";
    break;
    case error.PERMISSION_DENIED:
    info += "Vous n’avez pas donné la permission";
    break;
    case error.POSITION_UNAVAILABLE:
    	info += "La position n’a pu être déterminée";
    break;
    case error.UNKNOWN_ERROR:
    	info += "Erreur inconnue";
    break;
    }

	document.getElementById("infoposition").innerHTML = info;
}