var apiKey = config.yelpAPI;
var postmanKey = config.postman;

// var myCity = $("#mySearch").val();
var myCity = "Berkeley";
console.log(myCity);

$('#search-form').bind('keydown', function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
    }
});

var food = {
  "async": true,
  "crossDomain": true,
  "url": "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=food&location=" + myCity + "&limit=9",
  "method": "GET",
  "headers": {
    "cache-control": "no-cache",
    "Postman-Token": postmanKey,
    "Authorization": "Bearer " + apiKey,
  }
}

$(document).ready(function(){
  $.ajax(food).done(function (response) {
    console.log(response);
    for (var i=0; i<response.businesses.length; i++) {
      var yelpDiv = "<div>";

      yelpDiv.attr("class", "row");

      $("#yelp-data").append(`<div><img src="${response.businesses[i].image_url}"></div>`);
      $("#yelp-data").append(`<div>${response.businesses[i].name}</div>`);
      $("#yelp-data").append(`<div>Price: ${response.businesses[i].price}</div>`);
      $("#yelp-data").append(`<div>Yelp Rating: ${response.businesses[i].rating}</div>`);
      $("#yelp-data").append(`<div>${response.businesses[i].location.address1}</div>`);
      $("#yelp-data").append(`<div>${response.businesses[i].display_phone}</div>`);
      // temporary styling
      $("#yelp-data").append(`<div>${"-------------"}</div>`);
    }
    
  });


})


