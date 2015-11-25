$(function() {
	var searchbox = $('#searchbox');

	searchbox.on('keyup', function() {
		searchbox.val('916 Wabash');
		getSuggestions();
	});
});

function getSuggestions() {
	var locList = document.getElementById('locsuggestions');
	var places = ['916 Wabash', '916 S. Wabash St, Chicago IL'];
	for (var i = 0; i < places.length; i++) {
		var text = document.createTextNode(places[i]);
		var li = document.createElement('li');
		li.appendChild(text);
		locList.appendChild(li);
	}
};