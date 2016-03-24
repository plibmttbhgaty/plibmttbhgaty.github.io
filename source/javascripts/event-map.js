var geocoder;
var map;
var markers = [];

// Creates infoWindow for a marker
// Launches infoWindow when marker is clicked
function addInfoWindow(marker, event) {
  var contentString = '<div id="info-window"' +
                      '<div id="siteNotice"' +
                      '</div>' +
                      '<h1 class="info-heading">' + event["location"] + '</h1>' +
                      '<ul>' +
                      '<li><b>Host:</b> ' + event["hostName"] + '</li>' +
                      '<li><b>RSVP:</b> ' + event["rsvpUrl"] + '</li>' +
                      '</ul>' +
                      '<center><a href="' + event["more-info"] + '">More Information</b></a><br><br>';

  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  marker.addListener('click', function() {
    infoWindow.open(map, marker);
  });
}

// Geocodes the given location
function codeAddress(data) {
  geocoder.geocode({ 'address': data["location"] }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latlong = results[0].geometry.location;
      console.log(latlong);

      var marker = new google.maps.Marker({
        position: latlong,
        map: map,
        title: data["title"]
      });

      markers.push(marker);

      addInfoWindow(marker, data);
    }
  });
}

// Wipes all markers from the display
function nullAllMarkers(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function updateMarkers() {
  nullAllMarkers();

  $.get('/events.json', {}, function(data) {
    for (var i = 0; i < data.length; i++) {
      codeAddress(data[i]);
    }
  });
}

// When the window has finished loading, create our Google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Initializes geocoding with Google Maps API
    geocoder = new google.maps.Geocoder();

    // Basic operations for a simple Google Map
    // For more options see:
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        zoom: 2,
        center: new google.maps.LatLng(40.6700, -73.9400), // NYC
        disableDefaultUI: true,
        scrollwheel: false,
        styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="event-map" seen below
    var mapElement = document.getElementById('event-map');
    map = new google.maps.Map(mapElement, mapOptions);

  updateMarkers();
}
