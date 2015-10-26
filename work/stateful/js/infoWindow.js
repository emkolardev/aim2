var map;
var marker;
var infoWin;
var service;
var address;
var distanceDestinations;
var mapOptions;
var defaultZip;
var startLoc;
var infoWinArray;
var vehicleData;
var startLat;
var startLng;
var geocoder;
var setLoc;
var infoWinIndex;

function initMap() {
  startLat = 41.8781136;
  startLng = -87.6297982;
  startLoc = new google.maps.LatLng(startLat, startLng);
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: startLoc,
    streetViewControl: false
  });

  google.maps.event.addListener(map, 'click', function(event) {
    addMarker(event.latLng, map);
  });

  addMarker(startLoc, map);

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">Van</h1>'+
      '<div id="bodyContent">'+
      '<p>Distance here</p>'+
      '</div>'+
      '</div>';

  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

google.maps.event.addDomListener(window, 'load', initMap);