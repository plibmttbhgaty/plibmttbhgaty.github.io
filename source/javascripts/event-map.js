// When the window has finished loading, create our Google map below
google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic operations for a simple Google Map
    // For more options see:
    // https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        zoom: 11,
        center: new google.maps.LatLng(40.6700, -73.9400), // NYC
        styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]
    };

    // Get the HTML DOM element that will contain your map
    // We are using a div with id="event-map" seen below
    var mapElement = document.getElementById('event-map');
    var map = new google.maps.Map(mapElement, mapOptions);

    // Add a marker because WHY NOT
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(40.6700, -73.9400),
        map: map,
        title: "Upcoming PLIBMTTBHGATYs"
    });
}