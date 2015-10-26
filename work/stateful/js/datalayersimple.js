var map;
var startLat = 41.8781136;
var startLng = -87.6297982;

function initMap() {
	var startLoc = new google.maps.LatLng(startLat, startLng);
  	map = new google.maps.Map(document.getElementById('map'), {
    	zoom: 4,
    	center: startLoc
  	});

  // NOTE: This uses cross-domain XHR, and may not work on older browsers.
  map.data.loadGeoJson('emily.json');
};