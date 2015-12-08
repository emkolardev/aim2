var map1 = document.querySelector('#map1');
var marker1 = document.querySelector('#marker1'); 
var dir1 = document.querySelector('#directions1');
var search1 = document.querySelector('#search1');
var searchbox = document.querySelector('#search-field');
var instructionsArray = [""];
var ticker = 2;
var currentInstruct = 0;
var navigationStarted = false;
var dirBtn = document.querySelector('#dir-button');
var instructions = document.querySelector('#instructions');
var instructRow = document.querySelector('#instruct-row');
var nextBtn = document.querySelector('#next-button');
var search2 = document.querySelector('#search2');
var srchField;
var chosenPlace;

(function() {
  'use strict';

  //var instructions = document.querySelector('#instructions');

  navigator.geolocation.getCurrentPosition(function(pos) {
    map1.longitude = pos.coords.longitude;
    map1.latitude = pos.coords.latitude;

    marker1.longitude = pos.coords.longitude;
    marker1.latitude = pos.coords.latitude;  
    marker1.clickEvents = true; 
  });

  dir1.addEventListener('google-map-response', function(e) {
    var steps = e.detail.response.routes[0].legs[0].steps;
    for (var i = 0; i < steps.length; i++) {
      instructionsArray[i] = steps[i].instructions;
      console.log(steps[i]);
      writeInstruction();
    }
  });

  marker1.addEventListener('google-map-marker-click', function() {
    console.log('You!');
  });

  search1.addEventListener('google-map-search-results', function(e) {
    console.log('search fired');
    var res = e.detail;
    if (!navigationStarted)
    {
      makeMarker(res[0], false);
      console.log(res[0].formatted_address);
    }
    else
    {
      for (var i = 0; i < 5; i++)
      {
        makeMarker(res[i], true);
      }
    }
  });

  dirBtn.addEventListener('click', function() {
    showNextDirection();
  });

  searchbox.addEventListener('keyup', function(e) {
    if (e.keyCode == 18)
    {
      searchPlace($(this).val());
    }
  });

})();

function searchPlace(term) {

  search1.query = term;
  search1.map = map1.map;

};

function getDirections() {

  var dir1 = document.querySelector('#directions1');
  navigator.geolocation.getCurrentPosition(function(pos) {
    dir1.startAddress = pos.coords.latitude + ', ' + pos.coords.longitude;
    dir1.endAddress = chosenPlace;
    dir1.map = map1.map; 
  });
};

function makeMarker(where, isOnRoute) {

  marker = document.createElement('google-map-marker');
  marker.id = "marker" + ticker;
  marker.latitude = where.latitude;
  marker.longitude = where.longitude;
  marker.title = where.name + " " + where.formatted_address;
  marker.info = where.name;
  marker.classList.add('gmark');
  console.log('made marker: ', marker.title);
  marker.map = document.querySelector('#map1').map;
  console.log('new marker id is ', marker.id);
  marker.clickEvents = true;
  marker.addEventListener('google-map-marker-click', function() {
    console.log('clicked: ' + this.title);
    chosenPlace = this.title;
    if (isOnRoute == false)
    {
      showDirections(this.title);
      searchbox.value = this.title;
    }
    if (isOnRoute == true)
    {
      srchField.value = this.title;
      document.querySelector('#confirm-button').style.visibility = 'visible';
    }
  });
  ticker += 1;
};

function showDirections(where) {

  instructRow.classList.add('show');
  instructions.innerHTML += ':<br>' + where;

};

function showNextDirection() {
  if (!navigationStarted)
  {
    getDirections();
    nextBtn.innerHTML = "Next";
    addTopBar();
    srchField = document.querySelector('#srch-field');
    srchField.addEventListener('keyup', function(e) {
      if (e.keyCode == 18)
        {
          searchOnRoute(this.value);
        }
    });
    instructions.innerHTML = (currentInstruct + 1) + '. ' + instructionsArray[currentInstruct];
    currentInstruct++;
  }
  else if (navigationStarted && (currentInstruct < instructionsArray.length))
  {
    instructions.innerHTML = (currentInstruct + 1) + '. ' + instructionsArray[currentInstruct];
    currentInstruct++;
  }
  navigationStarted = true;
};

function writeInstruction() {
  instructions.innerHTML = (currentInstruct + 1) + '. ' + instructionsArray[currentInstruct];
};

function searchOnRoute(term) {

  search1.query = term;
  search1.map = map1.map;

}


//a