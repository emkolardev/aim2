var ikeaUrl = "url('../images/map3.png');";

var tour = {
      id: "hello-hopscotch",
      steps: [
        {
          title: "This is EnRoute.",
          content: "You can use it to get directions and find other stuff on the way.",
          target: "menu-toggle",
          placement: "bottom"
        },
        {
          title: "Search a Destination",
          content: "Search for 'Ikea', then press alt.",
          target: "search-field",
          placement: "bottom",
          onNext: function() {
            $('#search-field').val('Ikea');
          }
        },
        {
          title: "Make a Route",
          content: "Let's get directions there.",
          target: "next-button",
          placement: "top",
          onNext: function() {
              getDirections();
              addTopBar();
          }
        },
        {
          title: "Start a Route",
          content: "Content",
          target:"next-button",
          placement: "top",
          onNext: function() {
          }
        }
      ]
    };

hopscotch.startTour(tour);
