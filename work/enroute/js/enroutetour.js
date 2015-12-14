var tour = {
      id: "hello-hopscotch",
      steps: [
        {
          title: "This is EnRoute.",
          content: "You can use it to get directions and find things on the way.",
          target: "menu-toggle",
          placement: "bottom"
        },
        {
          title: "Search any Destination",
          target: "search-field",
          placement: "bottom"
        },
        {
          title: "Make a Route",
          content: "Let's get directions there.",
          target: "instruct-row",
          placement: "top"
        },
        {
          title: "Look for something that's on your way",
          target:"srch-field",
          placement: "bottom"
        }
      ]
    };

hopscotch.startTour(tour);
