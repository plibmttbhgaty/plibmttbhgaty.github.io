$(document).ready(function() {
  animateElements($(".first-letter"));
  showEventsList($("#events-list"));
});

function animateElements(element, animateDelay) {
  var delayMultiplier = 150,
      animateSpeed = 150,
      changedColor = "#91ffec",
      originalColor = "#ff91a4";

  $.each(element, function(index, value) {
    if (animateDelay == true) {
      $(this).delay(index * delayMultiplier)
        .animate({color: changedColor}, animateSpeed)
        .delay(1950 - (index * delayMultiplier))
        .animate({color: originalColor}, animateSpeed);
    } else {
      $(this).delay(index * delayMultiplier)
        .animate({color: changedColor}, animateSpeed)
        .animate({color: originalColor}, animateSpeed);
    }
  });
}

function showEventsList($element) {
  $.get("/events.json").done(
    function(data) {
      $.each(data, function(_index, value) {
        var event = value;
        var eventDetailsListItem = "<li><a href='" +
          event.rsvpUrl +
          "'>" +
          event.location +
          " on " +
          event.date +
          "</a></li>";
        $element.append(eventDetailsListItem);
      }
    )
  });
}
