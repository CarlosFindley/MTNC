// API key setup
var googleKey = config.googleKey;

// Intialize firebase
var conf = {
    apiKey: googleKey,
    authDomain: "mtnc-project.firebaseapp.com",
    databaseURL: "https://mtnc-project.firebaseio.com",
    projectId: "mtnc-project",
    storageBucket: "",
    messagingSenderId: "471099012342"
  };
  firebase.initializeApp(conf);

// Documentation mentions using the line below to initialize firebase - do I need the above?
// var firebase = new Firebase("https://mtnc-project.firebaseio.com");  

var data = {
    sender: null,
    timestamp: null,
    lat: null,
    lng: null
};

/**
 * Starting point for running the program. Authenticates the user.
 * param {function} Called when authentication succeeds.
 */
function initAuthentication(onAuthSuccess) {
    firebase.authAnonymously(function(error, authData) {
        if (error) {
            console.log('Login Failed!', error);
            } else {
                data.sender = authData.uid;
                onAuthSuccess();
            }
        }, {remember: 'sessionOnly'}); // Users given new ID for every session
    }

// Listener for when a click is added - add it to the heatmap.
clicks.orderByChild('timestamp').startAt(startTime).on('child_added', 
    function(snapshot) {
        var newPosition = snapshot.val();
        var point = new google.maps.LatLng(newPosition.lat, newPosition.lng);
        heatmap.getData().push(point);
    }
);

/**
 * Set up a Firebase with deletion on clicks older than expirySeconds
 * param {!google.maps.visualization.HeatmapLayer} heatmap - The heatmap to
 * which points are added from Firebase.
 */

// Create a heatmap
var heatmap = new google.maps.visualization.HeatmapLayer({
    data: [],
    map: map,
    radius: 16
});


function initFirebase(heatmap) {
    
    // 10 minutes before current time
    var startTime = new Date().getTime() - (60 * 10 * 1000);

    // Reference to the clicks in Firebase
    var clicks = firebase.child('clicks');

    // Remove old clicks
    clicks.orderByChild('timestamp').endAt(startTime).on('child_added', 
        function(snapshot) {
            snapshot.ref().remove();
        }
    );
}

/**
 * Adds a click to firebase.
 * param {Object} data - The data to be added to firebase.
 *     It contains the lat, lng, sender and timestamp.
 */
function addToFirebase(data) {
    getTimestamp(function(timestamp) {
        // Add new timestamp to the record data
        data.timestamp = timestamp;
        var ref = firebase.child('clicks').push(data, function(err) {
            if (err){
                console.log(err);
            }
        });
    });
}

/**
 * Also called each time the map is clicked.
 * Updates the last_message/ path with the current timestamp.
 * param {function(Date)} addClick - After the last message timestamp has been updated,
 *     this function is called with the current timestamp to add the
 *     click to the firebase.
 */
function getTimestamp(addClick) {
    // Reference to location for saving the last click time
    var ref = firebase.child('last_message/' + data.sender);

    ref.onDisconnect().remove(); // Delete reference from firebase on disconnect

    // Set value to timestamp
    ref.set(Firebase.ServerValue.TIMESTAMP, function(err){
        if (err) { // Write to last message was unsuccessful
            console.log(err);
        } else { // Write to last message was successful
            ref.once('value', function(snap) {
                addClick(snap.val()); // Add click with same timestamp.
            }, function(err) {
                console.log(err);
            });
        }
    });
}


initAuthentication(initFirebase.bind(undefined, heatmap));

heatmap.getData().push(point);

// Listen for clicks and add the location of the click to firebase database
map.addListener('click', function(e){
    data.lat = e.latLng.lat();
    data.lng = e.latLng.lng();
    addToFirebase(data);
});