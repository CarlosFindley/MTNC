var apiKey = config.yelpAPI;
var postmanKey = config.postman;
console.log("food app running")
$('#search-form').submit(function (e) {
  e.preventDefault();
  foodAJAX($("#mySearch").val().trim());
});

$('#search-form').bind('keydown', function (e) {
  if (e.keyCode == 13) {
    e.preventDefault();
    foodAJAX($("#mySearch").val().trim());
  }
});

$(document).ready(function () {

  foodAJAX = function (myCity) {
    if (myCity.includes(",")) {
      myCity = myCity.slice(0, myCity.indexOf(","))
    }
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
    
    $.ajax(food).done(function foodCall(response) {

      console.log(response);
      $("#yelp-data").empty();
      
      for (var i = 0; i < response.businesses.length; i++) {

        var yelpDivContainer = $("<div>");
        yelpDivContainer.attr("class", "row");

        var imgDiv = $("<div>");
        imgDiv.addClass("col-lg-8");

        var yelpDiv = $("<div>");
        yelpDiv.addClass("col-lg-4 text-style");


        var foodImg = $("<img>");
        foodImg.addClass("yelp-img");
        foodImg.attr("src", response.businesses[i].image_url);
        foodImg.attr("style", 'width: 350px');
        foodImg.attr("style", 'height: 350px');


        // p tags for info
        var pName = $("<h3>").text(response.businesses[i].name);
        var pRating = $("<h5>").text("Yelp Rating: " + response.businesses[i].rating);
        var pPrice = $("<p>").text("Price: " + response.businesses[i].price);
        var pLocation = $("<h6>").text(response.businesses[i].location.address1);
        var pPhone = $("<p>").text(response.businesses[i].display_phone);

        imgDiv.append(foodImg);
        yelpDiv.append(pName);
        yelpDiv.append(pRating);
        yelpDiv.append(pPrice);
        yelpDiv.append(pLocation);
        yelpDiv.append(pPhone);

        yelpDivContainer.append(imgDiv, yelpDiv);

        $("#yelp-data").append(yelpDivContainer);

      }

    });
  }


})


