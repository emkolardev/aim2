var startLoc;
var endLoc;
var search1;
var ticker;
var ticker2;
var marker;
var locSetter;
var res;
var searchHeader;
var map1;
var searchStr;
var searchStr2;
var instructions;
var search2;

(function() {
  'use strict';

  locSetter = $('#set-start');
  var startIcon = $('#set-start-icon');
  map1 = document.querySelector('#map1');
  var marker1 = document.querySelector('#marker1');
  var dir1 = document.querySelector('#directions1');
  instructions = document.querySelector('#instruct');
  searchStr = document.querySelector('#searchbox');
  searchStr2 = document.querySelector('#searchbox2');
  search2 = document.querySelector('#search2');
  var searchbody = document.querySelector('#searchbody');
  var display = document.querySelector('#display-loc-name');
  var carIcon = document.querySelector('#car-icon');
  searchHeader = document.querySelector('#search-header');
  search1 = document.querySelector('#search1');
  ticker = 1;
  ticker2 = 1;
  map1.clickEvents = true;
  map1.singleInfoWindow = true;

  dir1.addEventListener('google-map-response', function(e) {
    //array of driving directions
    console.log(e);
    var steps = e.detail.response.routes[0].legs[0].steps;
    for (var i = 0; i < steps.length; i++) {
      instructions.innerHTML += "<li>" + steps[i].instructions + "</li>";
    }
  });

  search1.addEventListener('google-map-search-results', function(e) {
    console.log('search fired');
    res = e.detail;
    if (searchbody.style.display == "block") 
    {
      populateSuggestions(res, searchStr.value);
    }
    else
    {
      console.log(res[0].formatted_address);
      display.innerHTML = res[0].formatted_address;
      searchStr.value = res[0].formatted_address;
    }
    // for (var i = 0; i <= 1; i++)
    // {
    //   console.log(res[i].name, res[i].latitude, res[i].longitude);
    //   makeMarker(res[i]);
    // }
  });

    search2.addEventListener('google-map-search-results', function(e) {
      console.log('search fired');
      res = e.detail;
      console.log(res[0].formatted_address);
      display.innerHTML = res[0].formatted_address;
      searchStr2.value = res[0].formatted_address;
      // for (var i = 0; i <= 1; i++)
      // {
      //   console.log(res[i].name, res[i].latitude, res[i].longitude);
      //   makeMarker(res[i]);
      // }
    });

  searchStr.addEventListener('keyup', function(e) {
    if (e.keyCode == 18)
    {
      console.log(searchStr.value);
      search1.query = searchStr.value;
      search1.map = map1.map;
    }
  });

  navigator.geolocation.getCurrentPosition(function(pos) {
    map1.longitude = pos.coords.longitude;
    map1.latitude = pos.coords.latitude;

    marker1.longitude = pos.coords.longitude;
    marker1.latitude = pos.coords.latitude;   

    // dir1.startAddress = pos.coords.latitude + ', ' + pos.coords.longitude;
    // dir1.endAddress = 'Martins BBQ Nashville, TN';
    // dir1.map = map1.map; 
  });

  marker1.clickEvents = true;
  marker1.info = {title: marker1.title};
  marker1.addEventListener('google-map-marker-click', function(evt) {
    console.log('clicked');
    marker1.open= true;
    // startLoc = {latitude: marker1.latitude, longitude: marker1.longitude};
    // console.log('start: ', startLoc.latitude, startLoc.longitude);
    toggleCurrents();
    search1.query = marker1.latitude + " " + marker1.longitude;
    search1.map = map1.map;
  });

  carIcon.addEventListener('click', function() {
    if (!startLoc)
    {
      startLoc = {latitude: marker1.latitude, longitude: marker1.longitude};
      console.log('start: ', startLoc.latitude, startLoc.longitude);
      showSecondSearch();
    }
  });

})();

function toggleCurrents() {
    if (instructions.classList.contains('show'))
    {
      instructions.classList.remove('show');
      locSetter.removeClass('show');
    }
    else
    {    
      instructions.classList.add('show');
      locSetter.addClass('show');
    }
};

function populateSuggestions(spots, term) {
  var locList = document.querySelector('#locsuggestions');
  var listItem, listText;
  for (var i = 0; i < 9; i++)
  {
    if (i === 0)
    {
      listText = document.createTextNode('search for ' + term);
    }
    else 
    {
      makeMarker(spots[i-1]);
      listText = document.createTextNode(spots[i-1].name);
    }
    listItem = document.createElement('li');
    listItem.id = "result" + ticker2;
    listItem.classList.add('flexColumn', 'show');
    ticker2++;
    listItem.appendChild(listText);
    locList.appendChild(listItem);
  }
};

function makeMarker(spot) {
  marker = document.createElement('google-map-marker');
  marker.id = "newmarker" + ticker;
  marker.latitude = spot.latitude;
  marker.longitude = spot.longitude;
  marker.title = spot.name;
  marker.info = spot.name;
  marker.classList.add('gmark');
  console.log('made marker with title ', marker.title);
  marker.map = document.querySelector('#map1').map;
  console.log('new marker id is ', marker.id);
  ticker += 1;
};

function showSecondSearch() {
  console.log('second search');
  var secondSearch = document.createElement('form');
  secondSearch.id = "search-form2";
  secondSearch.classList.add('find');
  secondSearch.innerHTML = '<div class="search-left">'+
              '<span class="search-icon" id="searchicon2"></span>'+
              '</div>'+
              '<div class="search-right" id="cancel-search2">'+
              '<span class="cancel-search" id="cancelsearch2"></span>'+
              '</div>'+
              '<div class="search-fill" id="find-place2">'+
              '<input type="text" id="searchbox2" class="search">'+
              '</div>';
  searchHeader.style.height = "80px";
  map1.style.top = "80px";
  locSetter.css('margin-top', '35px');
  searchHeader.appendChild(secondSearch);
  secondSearch.style.marginTop = "10px";
  document.querySelector('#searchbox2').addEventListener('keyup', function(e) {
    if (e.keyCode == 18)
    {
      console.log(document.querySelector('#searchbox2').value);
      search2.query = document.querySelector('#searchbox2').value;
      search2.map = map1.map;
    }
  });
};




