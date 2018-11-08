var i=0
var myInterval = setInterval(function () {

   var bgImages = ["boat.jpg", "cali-beach.jpg", "dining-fisherman.jpg", "longbeach.jpg", "muir-wood.jpg", "palace-of-fine-art.jpg", "sf-city.jpg", "sf-night.jpg", "sf-street.jpg", "sunrise.jpg"];
   // var bgImgValue = bgImages[Math.floor(Math.random() * bgImages.length)];
   bgImgValue=bgImages[i]
   i++;
   if(i>=bgImages.length){i=0}
   var urlVal = `url(assets/images/${bgImgValue})`
   $("body").css({
       "background-image": urlVal, "background-size": "cover",
       "background-attachment": "fixed", "background-position": "center", "background-repeat": "no-repeat", "background-color": "rgba(0, 0, 0, 0.3)", "background-blend-mode": "overlay",
       
   });

}, 3000)