// This is one option
// var i=0
// var myInterval = setInterval(function () {
    
//     var bgImages = ["cali-beach.jpg", "longbeach.jpg", "sf-night.jpg", "sunrise.jpg", "fall.jpg", "fallbg.jpg"];
//     // var bgImgValue = bgImages[Math.floor(Math.random() * bgImages.length)];
//     bgImgValue=bgImages[i]
//     i++;
//     if(i>=bgImages.length){i=0}
//     var urlVal = `url(assets/images/${bgImgValue})`
//     $("body").css({
//         "background-image": urlVal, "background-size": "cover",
//         "background-attachment": "fixed", "background-position": "center", "background-repeat": "no-repeat", "background-color": "rgba(0, 0, 0, 0.3)", "background-blend-mode": "overlay",
//         "transition": "all .5s ease",
   
//         });

// }, 6000)

$(document).ready(function(){

// This is another option
var bgImages = ["cali-beach.jpg", "longbeach.jpg", "sf-night.jpg", "sunrise.jpg", "fallbg.jpg", "bird-beach.jpg", "city-night.jpg", "sandiego.jpg", "sd-beach.jpg", "Sunrise-Beach.jpg"];
var bgImgValue = bgImages[Math.floor(Math.random() * bgImages.length)];
var urlVal = `url(assets/images/${bgImgValue})`
$("body").css({
    "background-image": urlVal, "background-size": "cover",
    "background-attachment": "fixed", "background-position": "center", "background-repeat": "no-repeat", "background-color": "rgba(0, 0, 0, 0.3)", "background-blend-mode": "overlay",
});

});