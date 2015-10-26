// AIzaSyAqVxdSisXdKYD_0qaWzVaJ3CCrHIUI2xA  api key

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

// initialize defaults. fill initial data from the database (just placeholder data for right now).
function initVariables() {

  defaultZip = 60605;
  setLoc = $('#zip').val() || defaultZip;
  // console.log("set location: " + setLoc);
  vehicleData = [
    {lat: 42.0333333, lng: -87.7333333, vehicle: 'Van', distance: 0}, 
    {lat: 42.0086426, lng: -87.6667239, vehicle: 'SUV', distance: 0}, 
    {lat: 41.885, lng: -87.7844444, vehicle: 'Truck', distance: 0}
  ];
  startLat = 41.8781136;
  startLng = -87.6297982;
  distanceDestinations = [];
  mapOptions = [];
  infoWinIndex = 0;
};

// sets findLoc to value of search form's zip input. if textbox is empty, sets a default.
function setNewLoc() {

  setLoc = $('#zip').val();  
  distMatrix();
  addVehicleMarkers();
  // infoForAllVehicleMarkers();
  // console.log("new location: " + setLoc);
  return setLoc;

};

// initialize the map. set an origin marker at initial/default location.
function initMap() {

  startLoc = new google.maps.LatLng(startLat, startLng);

  // console.log("startLoc coordinates: " + startLoc);
  
  geocoder = new google.maps.Geocoder();
  mapOptions = 
  {
    zoom: 8,
    center: startLoc,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    streetViewControl: false
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);
  // console.log("Made a maps");                                            
  
  // add click listener to map so pin can drop in clicked location
  google.maps.event.addListener(map, 'click', function(event) {
    makeMarker(event.latLng, map);
  });

  marker = new google.maps.Marker({
    position: startLoc,
    map: map,
    title: "Origin"
  });

  marker.setMap(map);

 var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">' + marker.title + '</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Distance:</b>' + marker.position + '</p>' + '</div>' + '</div>';

  console.log(contentString);

  infoWin = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infoWin.open(map, marker);
  });

};


// add a new pin (marker) to the map
function makeMarker(newLoc, map, titleText, distance) {

  if (!distance) distance = 0;
  if (!titleText) titleText = 'Location:';
  marker = new google.maps.Marker({
    position: newLoc,
    map: map,
    title: titleText
  });
  marker.setMap(map);
  return marker;
  //console.log("Made marker: " + titleText + " " + newLoc);
};

function addVehicleMarkers() {
  
  for (var i = 0; i < vehicleData.length; i++)
  {
    var position = new google.maps.LatLng(vehicleData[i].lat, vehicleData[i].lng);
    // console.log("vehicle coordinates: " + position);
    var myMarker = new google.maps.Marker({
      position: position, 
      map: map, 
      title: vehicleData[i].vehicle
    });
    attachInfoWin(myMarker);
  }
}

function codeAddress() {
  address = setNewLoc();
  geocoder.geocode( {'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) 
    {
      // console.log("geocoding: " + address);
      map.setCenter(results[0].geometry.location);
      makeMarker(results[0].geometry.location, map, results[0].formatted_address);
    }  
    else 
    {
      alert("Geocoder was not successful for the following reason: " + status);
    }
  });
};

function distMatrix() {
  for (var i = 0; i < vehicleData.length; i++)
  {
    distanceDestinations[i] = new google.maps.LatLng(vehicleData[i].lat, vehicleData[i].lng);
  }
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
  {
    origins: [startLoc],
    destinations: distanceDestinations,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.IMPERIAL,
  }, callback);
};

function callback(response, status) {

  if (status == google.maps.DistanceMatrixStatus.OK) 
  {
    var originAdds = response.originAddresses;
    var destAdds = response.destinationAddresses;

    for (var i = 0; i < originAdds.length; i++) 
    {
      var results = response.rows[i].elements;

      for (var j = 0; j < results.length; j++) 
      {
        var el = results[j];
        var distance = el.distance.text;
        var duration = el.duration.text;
        var from = originAdds[i];
        var to = distanceDestinations[j];
        vehicleData[j].distance = distance;
        // console.log("from: " + from + " to: " + to + "dist: " + distance);
      }
    }
  }
};

function attachInfoWin(mkr) {
  
  var myMarker = new google.maps.Marker({
    position: mkr.position,
    map: map,
    title: mkr.title
  });

  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">' + myMarker.title + '</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Distance:</b>' + myMarker.position + '</p>' + '</div>' + '</div>';

  console.log(contentString);

  infoWin = new google.maps.InfoWindow({
    content: contentString
  });

  myMarker.addListener('click', function() {
    infoWin.open(map, myMarker);
  });
};

// function infoForAllVehicleMarkers() {
//   for (var i = 0; i < vehicleData.length; i++)
//   {
//     attachInfoWin(i);
//   }
// }


$('document').ready(initVariables());