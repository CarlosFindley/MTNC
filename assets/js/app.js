
// var queryURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&titles=San_Francisco&prop=images&imlimit=10&format=json"
// $.get(queryURL).done(function (data) {
//     console.log(data);
// });
// //var queryURL2 = "http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=michaelwhittemore"
// // $.get(queryURL2).done(function (data) {
// //     console.log(data)
// // })
// // var img = $("<img>")
// // img.attr("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Das_Staatstheater_am_G%C3%A4rtnerplatz_04.jpg/1280px-Das_Staatstheater_am_G%C3%A4rtnerplatz_04.jpg")
// // $("#photo").append(img)
// var filename = "SanFrancisco3-uscs-1853.jpg"
// var query3 = `api.php?action=query&titles=File:Albert%20Einstein%20Head.jpg&prop=imageinfo&&iiprop=url&iiurlwidth=220`
// var entry = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?"
// var queryURL3 = entry + query3
// //console.log(queryURL3)
// var searchObject = {
//     title: 'san francisco',
// }
// $.get(queryURL3).done(function (data) {
// })
// console.log("search: "+$.param({
//     url: '//en.wikipedia.org/w/api.php',
//     data: { action: 'query', list: 'search', iiprop: 'url', srsearch: 'textSearch', format: 'json' },
//     dataType: 'jsonp',
// }))
// //var photos = ['https://media-cdn.tripadvisor.com/media/photo-m/1280/01/70/71/51/the-painted-ladies-of.jpg',
// //   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/San_Francisco%2C_California._June_2017_cropped.jpg/1200px-San_Francisco%2C_California._June_2017_cropped.jpg',
// // 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/SanFrancisco_from_TwinPeaks_dusk_MC.jpg/1680px-SanFrancisco_from_TwinPeaks_dusk_MC.jpg']
// //change image working example
// // var i = 0;
// // var photoTimer = setInterval(function () {
// //     $("#photo").empty()
// //     var img2 = $("<img>")
// //     img2.attr("src",photos[i])
// //     $("#photo").append(img2)
// //     i++;
// //     if (i>2){i=0}
// // }, 2000)


//start with the search term
//then we should generate a ajax call with the search term
var searchTerm = "Moscow"
replaceSpaces = function (inputString) {
    for (i in inputString) {
        if (inputString[i] == " ")
            inputString = inputString.replace(" ", "_")
    }
    return inputString
}
var dataObject
var pages
var imageListFiles = []
var imageURLs = []
var queryURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&titles=${replaceSpaces(searchTerm)}&format=json&prop=images`
$.get(queryURL, function (data) {

    dataObject = data

}).then(function () {
    var myPages = dataObject.query.pages
    pages = myPages
    var myKey = Object.keys(myPages)[0]
    var imageList = myPages[myKey].images
    for (i in imageList) {
        imageListFiles.push(imageList[i].title)
    }
    for (i in imageListFiles) {
        imageListFiles[i] = (replaceSpaces(imageListFiles[i]))
    }
    console.log(imageListFiles)
    for (i in imageListFiles) {
        $.get(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&titles=${imageListFiles[i]}&prop=imageinfo&iiprop=url&format=json`, function (data) {
            console.log(data)
            imageURLs.push(data.query.pages[-1].imageinfo[0].url)
            console.log(data.query.pages[-1].imageinfo[0].url)
        }).then(function(){makesImages(imageURLs)})
    }
})


makesImages = function (imageList) {
    $("#photo").empty()
    for (i in imageList) {
        var img = $("<img>")
        img.attr("src", imageList[i])
        img.css("max-width",'230px',
        'max-height','95px',
        'width', 'auto',
        'height', 'auto')
        $("#photo").append(img)

    }

}

imageArray[Math.floor(Math.random() * imageArray.length)];


