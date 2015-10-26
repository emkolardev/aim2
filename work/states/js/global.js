$(function () {

	var posts = $('[data-toggle-class]');
	
	posts.on('click', function(event) {

		event.preventDefault();
		var className = $(this).data('toggle-class');
		console.log(className);
		$(this).toggleClass(className);

	});



});