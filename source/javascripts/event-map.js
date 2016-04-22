Plibmttbhgaty.EventMap = {};

Plibmttbhgaty.EventMap = function() {
  this.mapElement = document.getElementById("event-map");
  this.geocoder = new google.maps.Geocoder();
  this.markers = [];
  this.map = null;
};

Plibmttbhgaty.EventMap.prototype.init = function(mapData) {
  if (mapData.length > 0) {
    $(this.mapElement).addClass("event-map");
    this.map = new google.maps.Map(this.mapElement, this._mapOptions());
    this._updateMarkers(mapData);
  }
};

Plibmttbhgaty.EventMap.prototype._updateMarkers = function(data) {
  this._nullAllMarkers();

  for (var i = 0; i < data.length; i++) {
    var event = data[i];
    this._codeAddress(data[i]);
  }
};

Plibmttbhgaty.EventMap.prototype._nullAllMarkers = function() {
  this.markers = [];
};

Plibmttbhgaty.EventMap.prototype._codeAddress = function(data) {
  var self = this;

  this.geocoder.geocode({ "address": data["location"] }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var latlong = results[0].geometry.location;

      var marker = self._drawMarker(data["title"], latlong);
      var infoWindow = self._addInfoWindow(marker, data);
      self._centerMapOnFirstMarker(marker, latlong, infoWindow);
    }
  });
};

Plibmttbhgaty.EventMap.prototype._drawMarker = function(title, latlong) {
  var marker = new google.maps.Marker({
    position: latlong,
    map: this.map,
    title: title
  });

  this.markers.push(marker);
  return marker
};

Plibmttbhgaty.EventMap.prototype._addInfoWindow = function(marker, event) {
  var windowContent = "<div id='info-window'" +
                      "<div id='siteNotice'" +
                      "</div>" +
                      "<h1 class='info-heading'>" + event["location"] + "</h1>" +
                      "<ul>" +
                      "<li><strong>Host:</strong> " + event["hostName"] + "</li>" +
                      "<li><strong>Date:</strong> " + event["date"] + "</li>" +
                      "<li><a href='" + event["rsvpUrl"] + "'>RSVP TODAY!</a></li>" +
                      "</ul>"

  var infoWindow = new google.maps.InfoWindow({
    content: windowContent
  });

  marker.addListener("click", function() {
    infoWindow.open(this.map, marker);
  });

  return infoWindow;
};

Plibmttbhgaty.EventMap.prototype._centerMapOnFirstMarker = function(marker, latlong, infoWindow) {
  if (this.markers.indexOf(marker) === 0){
    this.map.setCenter({
      lat: latlong.lat(),
      lng: latlong.lng()
    });
    this.map.setZoom(3);

    infoWindow.open(this.map, marker);
  }
};

Plibmttbhgaty.EventMap.prototype._mapOptions = function() {
  return {
    zoom: 2,
    center: new google.maps.LatLng(40.6700, -73.9400), // NYC
    disableDefaultUI: true,
    scrollwheel: false,
    styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#e6f3d6"},{"visibility":"on"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#f4d2c5"},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels.text","stylers":[{"color":"#4e4e4e"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#f4f4f4"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#787878"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#eaf6f8"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#eaf6f8"}]}]
  };
};
