
var latLng = {lat: 41.910875, lng: -87.648357};;
var marker;
var contentString = '<div id="content">'+
      '<h2 id="firstHeading" class="firstHeading">Start</h2>'+
      '<div id="bodyContent">'+
      '<p>Lat: '+ latLng.lat +
      '<br>Long: '+ latLng.lng +
      '</p>'+
      '</div>'+
      '</div>';
var infoWindow;
var searchbar = document.getElementById('searchbox');
var map;

searchbar.addEventListener('keyup', findLocation);

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: latLng,
		zoom: 14
		});

	marker = new google.maps.Marker({
		position: latLng,
		title: 'Start',
		animation: google.maps.Animation.DROP,
		draggable: true
	});

	infoWindow = new google.maps.InfoWindow({
		content: contentString
	});

	marker.addListener('click', function() {
	    infoWindow.open(map, marker);
	  });

	marker.setMap(map);
};

function makeMarker(coordinates, name) {
	contentString = '<div id="content">'+
      '<h2 id="firstHeading" class="firstHeading">'+ name +
      '</h2>'+
      '<div id="bodyContent">'+
      '<p>Lat: '+ coordinates.lat +
      '<br>Long: '+ coordinates.lng +
      '</p>'+
      '</div>'+
      '</div>';

	marker = new google.maps.Marker({
		position: coordinates,
		title: name,
		draggable: true
	});

	infoWindow = new google.maps.InfoWindow({
		content: contentString
	});

	marker.addListener('click', function() {
		infoWindow.open(map, marker);
	});

	marker.setMap(map);
};

function findLocation() {

	console.log('finding');

	marker.setMap(null);

	latLng = {lat: 41.866876, lng: -87.622833};

	makeMarker(latLng, 'Start');
};



