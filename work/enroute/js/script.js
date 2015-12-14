//element ids
var menuToggle, menuPanel, menuList, mainBar, searchCancel, searchField, 
routeBtn, exploreBtn, explorePanel, mainPanel, currLoc, userEmail, 
userPhrase, userMatch, loginBtn, createBtn, createSubmitBtn, 
createCancelBtn, adminPanel;

//element classes
var modeButtons;

//app states
var searchText, phrases, user;

//local storage
var db = sessionStorage;

$(function () {
	'use strict';

	//set element id variables
	menuToggle = $('#menu-toggle');
	menuPanel = $('#menu-panel');
	menuList = $('#menu-ul');
	mainBar = $('#main-bar');
	searchCancel = $('#search-cancel');
	searchField = $('#search-field');	
	routeBtn = $('#route-button');
	exploreBtn = $('#explore-button');
	explorePanel = $('#explore-panel');
	mainPanel = $('#main-panel');
	userEmail = $('#user-email');
	userPhrase = $('#user-phrase');
	userMatch = $('#user-match');
	loginBtn = $('#login-button');
	createBtn = $('#create-button');
	currLoc = $('#map-marker');
	adminPanel = $('#admin-panel'); 
	createSubmitBtn = $('#create-submit');
	createCancelBtn = $('#create-cancel');

	//set element class variables
	modeButtons = $('.optionButton');

	//set initial app states
	searchText = false;

	menuToggle.on('click', function() {
		isLoggedIn();
		var extraBars = $('top-bar');
		var setMargin = 0;
		if (extraBars.length > 0) {
			setMargin += extraBars.length * 50;
		}
		menuPanel.toggleClass('openMenu');
		menuPanel.css('margin-top', setMargin + 'px');
		menuList.toggleClass('openMenu');
	});

	//show cancel button when text exists in search box
	searchField.keyup(function() {
		if (searchField.val()) { searchText = true; }
		else { searchText = false; }
		if (searchText) { searchCancel.addClass('showClose'); }
		else { searchCancel.removeClass('showClose'); }
	});

	searchField.keypress(function(e) {
 		var key = e.which;
 		if (key == 13) {
  			e.preventDefault();
  	    	var allBars = $('top-bar');
  	    	if (!allBars.length) {
    			var bar = document.createElement('top-bar');
    			bar.id = 'pitstop';
    			$('#main-panel').append(bar);
  			}
  		}
	});   

	//route and discover buttons (mode buttons) clicked - appearance toggle
	//also set and unset discoverMode
	routeBtn.on('click', function() {
		$(this).addClass('chosen');
		exploreBtn.removeClass('chosen');
		explorePanel.removeClass('show');
	});

	exploreBtn.on('click', function() {
		routeBtn.removeClass('chosen');
		$(this).addClass('chosen');
		explorePanel.addClass('show');
	});

	userEmail.on('focusin', function() {
		$( this ).removeClass('invalid');
		$( this ).removeClass('valid');
	});

	userEmail.on('focusout', function() {
		isEmailValid($(this).val());
	})

	userPhrase.on('focusin', function() {
		$( this ).removeClass('invalid');
		$( this ).removeClass('valid');
	});	

	userPhrase.on('focusout', function() {
		isPhraseValid($(this).val());
	});

	userPhrase.on('keydown', function() {
		userMatch.val('');
		userMatch.removeClass('valid');
		userMatch.removeClass('invalid');
	});

	// userMatch.on('keyup', function() {
	// 	var confirmed = isMatchValid(userPhrase.val(), $( this ).val());
	// 	if (confirmed && isEmailValid(userEmail.val())) {
	// 	}
	// });

	userPhrase.on('focusin', function() {
		$( this ).removeClass('invalid');
		$( this ).removeClass('valid');
	});	

	// userMatch.on('focusin', function() {
	// 	$( this ).removeClass('invalid');
	// 	$( this ).removeClass('valid');
	// });	

	// userMatch.on('focusout', function() {
	// 	phrases = isMatchValid(userPhrase.val(), $( this ).val());
	// 	if (phrases)
	// 	{
	// 		$( this ).removeClass('invalid');
	// 		$( this ).addClass('valid');
	// 	}
	// 	else
	// 	{
	// 		$( this ).removeClass('valid');
	// 		$( this ).addClass('invalid');
	// 	}
	// })

	// currLoc.on('click', function() {
	// 	console.log('mic check current');
	// });

	loginBtn.on('click', function() {
		if (isLoggedIn()) { return; }
		else {
			adminPanel.addClass('show');
		}
		menuPanel.toggleClass('openMenu');
		menuList.toggleClass('openMenu');
	});

	createBtn.on('click', function() {
		if (isLoggedIn()) {
			db.clear();
			adminPanel.removeClass('show');
		}
		else {
			adminPanel.addClass('show');
		}
		menuPanel.toggleClass('openMenu');
		menuList.toggleClass('openMenu');
	});

	createSubmitBtn.on('click', function() {
		user = userEmail.val();
		db.setItem('username', userEmail.val());
		console.log(db);
		adminPanel.removeClass('show');
	});


	createCancelBtn.on('click', function() {
		adminPanel.removeClass('show');
	});
});

function isLoggedIn() {

	if (db.username) {
		loginBtn.html(db.username);
		createBtn.html('Logout');
		return true;
	}
	else {
		db.clear();
		loginBtn.html('Login');
		createBtn.html('Create');
		return false;
	}

};


function isEmailValid(email) {
		if ((email.indexOf("@") >= 0) && (email.indexOf(".") >= 0) && (/[a-zA-Z]/.test(email)))
		{ userEmail.addClass('valid'); $('#emailHelpText').css('display', 'none'); return true; }
		else
		{ userEmail.addClass('invalid'); $('#emailHelpText').css('display', 'block'); return false; }
};

function isPhraseValid(phrase) {
	if (phrase.length >= 8) 
	{ 
		userPhrase.addClass('valid'); 
		$('#passHelpText').css('display', 'none'); 
		//$('#confirm-phrase').removeClass('hideConfirm'); 
		return true; 
	}
	else 
	{ 
		userPhrase.addClass('invalid'); 
		$('#passHelpText').css('display', 'block'); 
		$('#confirm-phrase').addClass('hideConfirm'); 
		return false; 
	}
};

// function isMatchValid(phrase, match) {
// 	if (phrase.length !== match.length) 
// 	{
// 		$('#matchHelpText').css('display', 'block');
// 		return false;
// 	}
// 	else if (isPhraseValid(phrase)) 
// 	{
// 		for (var i = 0; i < phrase.length; i++)
// 		{
// 			if (phrase[i] === match[i])
// 			{
// 				if (i === (phrase.length - 1))
// 				{
// 					console.log('match');
// 					$('#matchHelpText').css('display', 'none');
// 					return true;
// 				}
// 			}
// 			if (phrase[i] !== match[i]) 
// 			{
// 				console.log('bust');
// 				$('#matchHelpText').css('display', 'block');
// 				return false;
// 			}
// 		}
// 	}
// };

function addTopBar() {
	var newBar = document.createElement('top-bar');
	newBar.classList.add('searchRoute');
	newBar.placeholder = "Search near route...";
	var bars = document.getElementsByTagName('top-bar');
	var newMargin = bars.length * 50;
	mainBar.after(newBar);
	newBar.style.marginTop = newMargin + 'px';
	console.log(newBar.style.marginTop);
};





//asdf