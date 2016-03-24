$(document).ready(function() {
  animateElements($(".word-highlight"));
  showEventsList($("#events-list"));
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

function showEventsList($element) {
  $.get("/events.json").done(
    function(data) {
      $.each(data, function(_index, value) {
        var event = value;
        var eventDetailsListItem = "<li class='event'><a href='" +
          event.rsvpUrl +
          "'><p class='event-location'>" +
          event.location +
          "</p><p class='event-date'>" +
          event.date +
          "</p><p class='event-host'>" +
          event.hostName +
          "</p></a></li>";
        $element.append(eventDetailsListItem);
      }
    )
  });
}
