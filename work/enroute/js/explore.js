var food, coffee, rest, misc, over, rec;

$(function() {

	food = document.querySelector('#cat-food');
	coffee = document.querySelector('#cat-coffee');
	rest = document.querySelector('#cat-rest');
	misc = document.querySelector('#cat-misc');
	over = document.querySelector('#cat-21');
	rec = document.querySelector('#cat-rec');

	food.addEventListener('click', function() {
		backToMap('food');
	});

	coffee.addEventListener('click', function() {
		backToMap('coffee');
	});

	rest.addEventListener('click', function() {
		backToMap('gas station');
	});

	misc.addEventListener('click', function() {
		backToMap('fun');
	});

	over.addEventListener('click', function() {
		backToMap('nightclub');
	});

	rec.addEventListener('click', function() {
		backToMap('park');
	});
});

function backToMap(searchTerm) {
	document.querySelector('#explore-button').classList.remove('chosen');
	document.querySelector('#explore-panel').classList.remove('show');
	document.querySelector('#route-button').classList.add('chosen');
	clearMarkers();
	searchbox.value = searchTerm;
	searchFor(searchTerm);
};

