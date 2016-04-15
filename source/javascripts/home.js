$(document).ready(function() {
  animateElements($(".word-highlight"));
  buildEventsLists({
    "$upcomingEventsList": $("#events-list"),
    "$pastEventsList": $("#past-events-list"),
  });
});

var wordCounter = 0;
function animateElements(element) {
  setTimeout(function() {
    var words = element,
        numOfWords = element.length,
        isHighlighted = "is-highlighted",
        thisWord = element[wordCounter];

    wordCounter++;
    words.removeClass(isHighlighted);
    $(thisWord).addClass(isHighlighted);

    if (wordCounter <= numOfWords) {
      animateElements(words);
    } else {
      wordCounter = 0;
      animateElements(words);
    }
  }, 300);
}

function buildEventsLists(options) {
  $upcomingEventsList = options.$upcomingEventsList;
  $pastEventsList = options.$pastEventsList;

  $.get("/events.json").done(
    function(data) {
      var noUpcomingEvents = true;

      $.each(data, function(_index, value) {
        var event = value;
        var eventDate = Date.parse(event.date);

        if (eventIsUpcoming(eventDate)) {
          noUpcomingEvents = false;
          var eventListItem = buildUpcomingEventListItem(event);
          $upcomingEventsList.append(eventListItem);
        } else {
          var eventListItem = buildPastEventListItem(event);
          $pastEventsList.append(eventListItem);
        }

        if (noUpcomingEvents) {
          showNoUpcomingEventsMessage();
        }
      }
    )
  });
}

function showNoUpcomingEventsMessage() {
  $(".no-upcoming-events").removeClass("hidden");
}

function buildUpcomingEventListItem(event, classes) {
  var element = "<li class='event'><a href='" +
    event.rsvpUrl +
    "'><p class='event-location'>" +
    event.location +
    "</p><p class='event-date'>" +
    event.date +
    "</p><p class='event-host'>" +
    event.hostName +
    "</p></a></li>";
  return element
}

function buildPastEventListItem(event, classes) {
  var element = "<li class='event past-event'><a href='" +
    event.rsvpUrl +
    "'><p class='event-location'>" +
    event.location +
    "</p><p class='event-date'>" +
    event.date +
    " (Past)</p><p class='event-host'>" +
    event.hostName +
    "</p></a></li>";
  return element
}

function eventIsUpcoming(eventDate) {
  var currentDate = Date.now()
  return eventDate > currentDate;
}
