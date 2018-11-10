//a function to replace all spaces with underscores in a string
//and captitalizes all starting lower case letters
replaceSpaces = function (inputString) {
    for (i=0; i<inputString.length;i++) {
        inputString = inputString.replace(inputString[0], inputString[0].toUpperCase())
        if (inputString[i] == " ") {
            inputString = inputString.replace(" ", "_")
            inputString = inputString.replace(inputString[i + 1], inputString[i + 1].toUpperCase())
        }
    }
    return inputString
}
//remove underscores and adds spaces
addSpaces=function(inputString){
    for(i in inputString){
        inputString=inputString.replace("_"," ")
    }
    return inputString
}
searchVerifier = function (searchTerm) {
    //first remove any data after the comma caused by the 
    //google function
    if (searchTerm.includes(",")){
        searchTerm=searchTerm.slice(0,searchTerm.indexOf(","))
    }
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
        searchObject = data
    }).then(function () {
        //this line checks if we're on a disambiguation page
        //and if so call the displayWikiContent with the first
        //valid search term
        if (searchObject[2][0].includes("may refer to")||searchObject[2][0].includes("most commonly refers to")) {
            displayWikiContent(searchObject[1][1])
        }
        //otherwise we just use the current searchterm
        else {
            displayWikiContent(replaceSpaces(searchObject[1][0]))
        }
    })
}
//actually takes in a search term that I know works and then uses
//that to push content to the page
displayWikiContent = function (goodSearchTerm) {
    var ImageUrl = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&prop=pageimages%7Cpageterms&generator=prefixsearch&redirects=1&formatversion=2&piprop=thumbnail&pithumbsize=1000&pilimit=20&wbptterms=description&gpssearch=${replaceSpaces(goodSearchTerm)}`
    //get the image
    $.get(ImageUrl, function (data) {
        data.query.pages.forEach(function (element) {
            if (element.title == goodSearchTerm ||element.title==addSpaces(goodSearchTerm)) {
                makesImage(element.thumbnail.source)
            }
        })
    })
    //get the history
    historyGenerator(goodSearchTerm)
}
//work with front end on this
makesImage = function (imageURL) {
    $("#city-images-display").empty()
    var img = $("<img class='imgStyle'>")
    img.attr("src", imageURL)
    img.css("max-width", '100%',
        'max-height', 'auto',
        'width', 'auto',
        'height', 'auto')
    $("#city-images-display").append(img)
}

// Form submission processor
$("#search-form").submit( function(event){
    event.preventDefault()
    searchVerifier($("#mySearch").val().trim())
})
$('#search-form').bind('keydown', function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        searchVerifier($("#mySearch").val().trim()) 
    }
});

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
//generates the text from the wikipedia article about the search term
historyGenerator = function (searchTerm) {
    var queryURL = `https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&titles=${replaceSpaces(searchTerm)}&redirects=true`;
    $.get(queryURL, function (data) {
        var articleText = data.query.pages[Object.keys(data.query.pages)[0]].extract
        //gets paragraphs equal to the paragraphcount
        var paragraphCount=2
        var currentIndex=-1
        for (i=0;i<=paragraphCount;i++){
            currentIndex=articleText.indexOf("</p>",currentIndex+1)
        }
        finalText=HTMLparser(articleText.slice(0,currentIndex))
        $("#history").empty()
        var historyParagraph=$("<p class='pStyle'>")
        historyParagraph.text(finalText)
        $("#history").append(historyParagraph)
    })
}
