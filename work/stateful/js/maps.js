var map;
var myLatLng = {lat: 41.8781136, lng: -87.6297982};
 
function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'You Are Here!'
  });
}






var map;
var chicagoLoop;
var service;
var infoWindow;
var myLocations = [{lat: 42.0333333, lng: -87.7333333}, {lat: 42.0086426, lng: -87.6667239}, {lat: 41.885, lng: -87.7844444}];
function initMap() {
  chicagoLoop = new google.maps.LatLng(41.8781136,-87.6297982);
  map = new google.maps.Map(document.getElementById('map'), {
    center: chicagoLoop,
    zoom: 9
  });
  console.log("makin maps");
var marker = new google.maps.Marker({
    position: chicagoLoop,
    map: map,
    title: 'You!'
  });
marker.setMap(map);
request = {
    location: chicagoLoop,
    radius: '40,233.600',
    };
service = new google.maps.places.PlacesService(map);
service.nearbySearch(request, callback);
};
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      // var place = results[i];
      createMarkers(results[i]);
    }
  }
}
function createMarkers(places) {
  var bounds = new google.maps.LatLngBounds();
  var placesList = document.getElementById('places');

  for (var i = 0, place; place = places[i]; i++) {
    var image = {
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(25, 25)
    };

    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      title: place.name,
      position: place.geometry.location
    });
    bounds.extend(place.geometry.location);
  }
  map.fitBounds(bounds);