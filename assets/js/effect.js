
var bgImages = ["boat.jpg", "cali-beach.jpg", "dining-fisherman.jpg", "longbeach.jpg", "muir-wood.jpg", "palace-of-fine-art.jpg", "sf-city.jpg", "sf-night.jpg", "sf-street.jpg", "sunrise.jpg"];
var bgImgValue = bgImages[Math.floor(Math.random() * bgImages.length)];
var urlVal = `url(assets/images/${bgImgValue})`
$("body").css({ "background-image": urlVal, "background-size": "cover", 
"background-attachment": "fixed", "background-position": "center", "background-repeat": "no-repeat" });

