
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


