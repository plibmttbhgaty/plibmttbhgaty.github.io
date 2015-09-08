$(document).ready(function() {
  animateElements($(".first-letter"));
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