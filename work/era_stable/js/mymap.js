var map1, marker1, dir1, search1, searchbox, dirBtn, instructions, instructRow, 
nextBtn, loader, srchField, destination, chosenStop, confirmBtn, instructArray, 
markerArray, destinations, pitstops, current, duration, onRoute;


(function() {
  'use strict';

  //set variables
  map1 = document.querySelector('#map1');
  marker1 = document.querySelector('#marker1'); 
  dir1 = document.querySelector('#directions1');
  search1 = document.querySelector('#search1');
  searchbox = document.querySelector('#search-field');
  dirBtn = document.querySelector('#dir-button');
  instructions = document.querySelector('#instructions');
  instructRow = document.querySelector('#instruct-row');
  nextBtn = document.querySelector('#next-button');
  searchCancel = document.querySelector('#search-cancel');
  loader = document.querySelector('#svg-loader');
  instructArray = [];
  markerArray = [];
  destinations = [];
  pitstops = [];
  current = 0;
  duration = 1;
  onRoute = false;

  //get user's current location and drop a pin there
  navigator.geolocation.getCurrentPosition(function(pos) {
    map1.longitude = pos.coords.longitude;
    map1.latitude = pos.coords.latitude;
    marker1.longitude = pos.coords.longitude;
    marker1.latitude = pos.coords.latitude;  
    marker1.clickEvents = true; 
    marker1.animation = "DROP";
    marker1.icon = '../images/current.png';
  });

  //listener for when map responds to a directions request
  dir1.addEventListener('google-map-response', function(e) {
    var steps = e.detail.response.routes[0].legs[0].steps;
    console.log(e.detail.response.routes[0].legs[0]);
    duration = e.detail.response.routes[0].legs[0].duration.value;
    for (var i = 0; i < steps.length; i++) {
      instructArray[i] = steps[i].instructions;
    }
    loader.classList.remove('loading');
    writeInstruction();
  });

  //
  marker1.addEventListener('google-map-marker-click', function() {
    getTitle(this);
  });

  //listener for when map responds to a searh query
  //makes map-markers for search results
  search1.addEventListener('google-map-search-results', function(e) {
    console.log('search fired');
    var res = e.detail;
    var i = 0;
    while ((i < res.length) && (i < 10))
    {
      makeMarker(res[i]);
      console.log(res[i].formatted_address);
      i++; //increment loop     
    }
  });

  //listener for when navigation button is clicked
  dirBtn.addEventListener('click', function() {
    if (!onRoute) {
      startRoute();
      return; 
    }
    showNextDirection(); 
  });

  //listener for 'alt' key (currently using this to run a search)
  searchbox.addEventListener('keyup', function(e) {
    if (e.keyCode == 18) {
      clearMarkers(false);
      searchFor($(this).val());
    }
  });

  searchCancel.addEventListener('click', function() {
    clearMarkers(false);
    searchField.val("");
    searchCancel.removeClass('showClose');
    searchField.removeClass('focused');
  });

})();

function getTitle(loc) {

  console.log('title: ', loc.title);
  return loc.title;

};

function makeTitle(loc) {

  console.log('title maker: ', loc.name, loc.formatted_address);
  return loc.name + ' ' + loc.formatted_address;

};

function searchFor(searchTerm) {

  search1.query = searchTerm;
  search1.map = map1.map;

};

function getDirections() {
  
  loader.classList.add('loading');
  navigator.geolocation.getCurrentPosition(function(pos) {
    dir1.startAddress = pos.coords.latitude + ', ' + pos.coords.longitude;
    dir1.endAddress = destination;
    dir1.map = map1.map; 
  });
  
};

function clearMarkers(all) {

  for (var i = 0; i < markerArray.length; i++) {
    var marker = markerArray[i];
    if (all) { marker.map = null; }
    else {
      if ((marker.title != destination) && (marker.title != chosenStop))
      {
        marker.map = null;
      }
    }
  }
  markerArray = [];

};

function makeMarker(loc) {

  //create the marker element, give it a class (gmark)
  marker = document.createElement('google-map-marker');
  marker.classList.add('gmark');

  //add it to a list of current markers so it can be cleared later
  markerArray.push(marker);

  //set its lat and long
  marker.latitude = loc.latitude;
  marker.longitude = loc.longitude;

  //make a title for marker
  marker.title = makeTitle(loc);
  console.log('made marker: ', marker);

  marker.icon = "../images/pinpink.png";
  marker.draggable = true;
  marker.animation = "DROP";

  //put it on the map, make it clickable
  marker.map = map1.map;
  marker.clickEvents = true;

  //set listener for click events, depending on whether navigation currently being followed
  setMarkerListener(marker);

};

function setMarkerListener(marker) {

if (!onRoute)
  {
    marker.addEventListener('google-map-marker-click', function() {
      console.log(this.title);
      destinations[0] = this.title;
      destination = this.title;
      searchbox.value = this.title;
      showDirPanel(this.title);
    });
  }
  else
  {
    marker.addEventListener('google-map-marker-click', function() {
      console.log(this.title);
      srchField.value = this.title;
      chosenStop = this.title;
      document.querySelector('#confirm-button').style.visibility = 'visible';
      confirmBtn = document.querySelector('#confirm-button');
      confirmBtn.addEventListener('click', function() {
        if (this.classList.contains('check')) {
          this.classList.add('deletable');
          return;
        }
        this.innerHTML = "";
        this.classList.add('check');
        addWaypoint(chosenStop);
      });
    });
  }

};

function showDirPanel(whereTo) {

  //show html element for getting directions
  instructRow.classList.add('show');
  instructions.innerHTML = 'Get Directions To:<br>' + whereTo;

};

function durationToMin(sec) {

  console.log((Math.round(sec / 60)) + ' min');
  return (Math.round(sec / 60)) + ' min';

};

function startRoute() {

  getDirections();
  clearMarkers(true);
  nextBtn.classList.remove('car');
  nextBtn.innerHTML = "Next";
  allowNewWaypoint();
  onRoute = true;
  console.log('nav started');

};

function allowNewWaypoint() {

  addTopBar();
  srchField = document.querySelector('#srch-field');
  srchField.addEventListener('keyup', function(e) {
      if (e.keyCode == 18)
        {
          searchFor(this.value);
        }
    });

};


function showNextDirection() {

  if (current < (instructArray.length - 1)) {
    writeInstruction();
  }
  else if (current < instructArray.length) {
    finishDirections();
  }
  return;

};

function writeInstruction() {

  instructions.innerHTML = instructArray[current];
  current++;

};

function finishDirections() {

  writeInstruction();
  nextBtn.innerHTML = "Done";

};

function addWaypoint(loc) {
  loader.classList.add('loading');
  pitstops.push({"location": loc});
  navigator.geolocation.getCurrentPosition(function(pos) {
    dir1.startAddress = pos.coords.latitude + ', ' + pos.coords.longitude;
    dir1.waypoints = pitstops;
    dir1.endAddress = destination;
    dir1.map = map1.map; 
  });
  clearMarkers(false);
  allowNewWaypoint();
  
};

