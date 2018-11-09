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

$(document).on("click", "button", function(){
  $.ajax(food).done(function (response) {
    console.log(response);
    for (var i=0; i<response.businesses.length; i++) {

      var yelpDivContainer = $("<div>");
      yelpDivContainer.attr("class", "row");

      var yelpDiv = $("<div>");
      yelpDiv.attr("class", "col-12-lg");

      var foodImg = $("<img>");
      foodImg.attr("src", response.businesses[i].image_url);
      foodImg.attr("style", 'width: 200px');
      foodImg.attr("style", 'height: 200px');

      // p tags for info
      var pName = $("<p>").text(response.businesses[i].name);
      var pRating = $("<p>").text("Yelp Rating: " + response.businesses[i].rating);
      var pPrice = $("<p>").text("Price: " + response.businesses[i].price);
      var pLocation = $("<p>").text(response.businesses[i].location.address1);
      var pPhone = $("<p>").text(response.businesses[i].display_phone);

      yelpDiv.append(foodImg);
      yelpDiv.append(pName);
      yelpDiv.append(pRating);
      yelpDiv.append(pPrice);
      yelpDiv.append(pLocation);
      yelpDiv.append(pPhone);

      yelpDivContainer.append(yelpDiv);

      $("#yelp-data").append(yelpDivContainer);

    }
    
  });


})


