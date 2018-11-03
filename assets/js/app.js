
var queryURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&titles=San_Francisco&prop=images&imlimit=10&format=json"

$.get(queryURL).done(function (data) {
    console.log(data);

});





//var queryURL2 = "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=michaelwhittemore"
// $.get(queryURL2).done(function (data) {
//     console.log(data)
// })
// var img = $("<img>")
// img.attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Das_Staatstheater_am_G%C3%A4rtnerplatz_04.jpg/1280px-Das_Staatstheater_am_G%C3%A4rtnerplatz_04.jpg")
// $("#photo").append(img)

var query3=`action=query&titles=Image:${filename}.jpg&prop=imageinfo&iiprop=url`


var photos = ['https://media-cdn.tripadvisor.com/media/photo-m/1280/01/70/71/51/the-painted-ladies-of.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/San_Francisco%2C_California._June_2017_cropped.jpg/1200px-San_Francisco%2C_California._June_2017_cropped.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/SanFrancisco_from_TwinPeaks_dusk_MC.jpg/1680px-SanFrancisco_from_TwinPeaks_dusk_MC.jpg']
//change image working example
var i = 0;
var photoTimer = setInterval(function () {
    $("#photo").empty()
    var img2 = $("<img>")
    img2.attr("src",photos[i])
    $("#photo").append(img2)
    i++;
    if (i>2){i=0}

}, 2000)