var isWhite = true;

var bttn = document.querySelector("button");
var backg = document.querySelector("body");

bttn.addEventListener("click", function(){
    // Method 1. Manual 
    // if(isWhite){
    //     // isWhite = false;
    //     backg.style.background = "purple";
    // }else{
    //     // isWhite = true;
    //     backg.style.background = "white";
    // }

    // isWhite = !isWhite

    // Method 2. Using toggle

    document.body.classList.toggle("purple");
});