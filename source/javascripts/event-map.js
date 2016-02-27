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
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="event-map" seen below
    var mapElement = document.getElementById('event-map');
    map = new google.maps.Map(mapElement, mapOptions);

  updateMarkers();
}
