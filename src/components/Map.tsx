import React = require('react');
declare var google: any;

function myMap() {
    var myCenter = new google.maps.LatLng(50.4544477, 30.6165073);
    var mapProp = {
        center: myCenter,
        zoom: 11,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    var marker = new google.maps.Marker({ position: myCenter }); marker.setMap(map);
    var infowindow = new google.maps.InfoWindow({
        content:
        "Hello World!"
    });
    infowindow.open(map, marker);

    google.maps.event.addListener(map, 'click', function (event: any) {
        placeMarker(map, event.latLng);
    });
}

function placeMarker(map: any, location: any) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
    var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
    });
    infowindow.open(map, marker);
}

export class Map extends React.Component<any, any>{

    render() {
        return (
            <div>
                <div id="googleMap" style={{ width: "100%", height: "400px" }}></div>
            </div>
        );
    }
};