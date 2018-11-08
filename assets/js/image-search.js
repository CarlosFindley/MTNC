//we need something for when it redirects
//maybe change it so it just grabs the thumbnail?

//https://en.wikipedia.org/w/api.php?format=xml&action=query&prop=extracts&titles=Stack%20Overflow&redirects=true
//need to get the html data and parse it

//`https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=250&pilimit=20&wbptterms=description&gpssearch=${searchTerm}&gpslimit=20`


//a function to replace all spaces with underscores in a string
replaceSpaces = function (inputString) {
    for (i in inputString) {
        if (inputString[i] == " ")
            inputString = inputString.replace(" ", "_")
    }
    return inputString
}
//takes in search value and then appends the image
// searchWiki = function (searchTerm) {
//     var dataObject
//     var imageListFiles = []
//     var imageURLs = []
//     var queryURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&titles=${replaceSpaces(searchTerm)}&format=json&prop=images`
//     console.log(queryURL)
//     $.get(queryURL, function (data) {
//         dataObject = data
//     }).then(function () {
//         console.log(dataObject) //testing
//         var myPages = dataObject.query.pages
//         var myKey = Object.keys(myPages)[0]
//         var imageList = myPages[myKey].images
//         for (i in imageList) {
//             imageListFiles.push(imageList[i].title)
//         }
//         for (i in imageListFiles) {
//             imageListFiles[i] = (replaceSpaces(imageListFiles[i]))
//         }
//         for (i in imageListFiles) {
//             $.get(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&titles=${imageListFiles[i]}&prop=imageinfo&iiprop=url&format=json`, function (data) {
//                 imageURLs.push(data.query.pages[-1].imageinfo[0].url)
//                 console.log(data.query.pages[-1].imageinfo[0].url)
//             }).then(function () { makesImages(imageURLs) })
//         }
//     })
// }


searchVerifier = function (searchTerm) {
    //gets results for the search 
    //check if the search term is a disambiguation page,
    //we do this by extracting the html and checking for 
    //"may also refer to"
    //if it is we instead use the search term that is next
    //in the data
    var queryURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${replaceSpaces(searchTerm)}`
    var contentURl = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=xml&action=query&prop=extracts&titles=${replaceSpaces(searchTerm)}&redirects=true`
    var searchObject;
    $.get(queryURL, function (data) {
        console.log(data)
        searchObject = data
    }).then(function () {
        //this line checks if we're on a disambiguation page
        //and if so call the displayWikiContent with the first
        //valid search term
        if (searchObject[2][0].includes("may refer to")) {
            displayWikiContent(searchObject[2][1])
        }
        //otherwise we just use the current searchterm
        else {
            console.log(searchTerm)
            dispatchWikiContent(searchTerm)
        }
    })
}

//actually takes in a search term that I know works and then uses
//that to push content to the page
var testObject //DELETE
displayWikiContent = function (goodSearchTerm) {
    var HistoryURl = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=xml&action=query&prop=extracts&titles=${replaceSpaces(goodSearchTerm)}&redirects=true`
    var ImageUrl = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=350&pilimit=20&wbptterms=description&gpssearch=${replaceSpaces(goodSearchTerm)}`
    //get the image
    $.get(ImageUrl, function (data) {
        testObject = data.query.pages
        data.query.pages.forEach(function (element) {
            if (element.title == goodSearchTerm) {
                console.log(element)
                makesImage(element.thumbnail.source)
            }
        })
    })
    //get the history
    $.get(HistoryURl, function(data){

    })
}

//work with front end on this
makesImage = function (imageURL) {
    $("#city-images-display").empty()
    var img = $("<img>")
    img.attr("src", imageURL)
    img.css("max-width", '230px',
        'max-height', '95px',
        'width', 'auto',
        'height', 'auto')
    $("#city-images-display").append(img)
}



$("#submit").on("click", function (event) {
    event.preventDefault()
    var searchTerm = $("#search").val()
    searchVerifier(searchTerm)
})


var testURL = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=xml&action=query&prop=extracts&titles=Stack%20Overflow&redirects=true"

//the parser strips out html tags, works recursively
HTMLparser = function (textString) {
    if (!textString.includes("<")) {
        return textString
    }
    for (i in textString) {
        var startIndex;
        var endIndex;
        if (textString[i] == "<") {
            startIndex = i;
        }
        else if (textString[i] == ">") {
            endIndex = parseInt(i) + 1;
            var startSub = textString.slice(0, startIndex)
            var endSub = textString.slice(endIndex, textString.length)
            var finishedString = startSub + endSub
            if (!finishedString.includes("<")) {
                return (finishedString)
            }
            else {
                return (HTMLparser(finishedString))
            }
        }
    }
}
var testObject//DELETE

//generates the text from the wikipedia article about the search term
historyGenerator = function (searchTerm) {
    var queryURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${replaceSpaces(searchTerm)}&redirects=true`;
    $.get(queryURL, function (data) {
        testObject = data
        var articleText = data.query.pages[Object.keys(data.query.pages)[0]].extract
        console.log(articleText)
    })
}
//historyGenerator("San Francisco")

//need to grab the first paragraph or two

//need to grab main image
//check if the first paragraph includes the quote "may also refer to"
displayWikiContent("San Francisco")