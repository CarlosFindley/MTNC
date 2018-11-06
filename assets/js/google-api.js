var map;
function initAutoMap() {
    map = new google.maps.Map(document.getElementById('city-map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10,
    });
    console.log("city-map", map);

    // Linking searches to search-box id-ed input
    var mySearch = document.getElementById('mySearch');
    var searchBox = new google.maps.places.SearchBox(mySearch);
    // script below forces search bar onto google map UI
    // map.controls[google.maps.ControlPosition.TOP_LEFT].push(mySearch);
    $('#search-form').bind('keydown', function(e) {
        if (e.keyCode == 13) {
            e.preventDefault();
        }
    });

    // Bias SearchBox results in relation to current map's viewport
    map.addListener('bounds_changed', function(){
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // addListener listens for event firing: user selects a prediction = more details for the place
    searchBox.addListener('places_changed', function(){
        var places = searchBox.getPlaces();

        if(places.length == 0) {
            return;
        }

        // Clears out old markers
        markers.forEach(function(marker){
            marker.setMap(null);
        });
        markers = [];

        // Retrieve icon, name and location of mySearch
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function(place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Marker created for each place
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });
};

