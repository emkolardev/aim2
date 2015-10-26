$(function() {

	//================
	// Variables
	//================

	var menuToggle = $('#menu-toggle');
	var menuContent = $('#menu-content');


	//================
	// Events
	//================

	menuToggle.on('click', function() {
		menuContent.toggleClass('open');
	});
	
});
