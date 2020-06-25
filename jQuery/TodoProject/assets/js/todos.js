// Strike element when selected
$("li").click(function(){
   
    // Method 1. Manual logic 
    // // Color returns rgb string, so we must compare it to gray's rbg code
    // if($(this).css("color")=== "rgb(128, 128, 128)"){
    //     $(this).css({
    //         color: "black",
    //         textDecoration: "none"
    //     });
    // }else{
    //     $(this).css({
    //         color: "gray",
    //         textDecoration: "line-through"
    //     });
    // }

    // Method 2. Using toggle 
    $(this).toggleClass("completed");
});

// Deleting element when clicking on X
$("span").click(function(event){

    // To remove li (element enclosing the span/parent) 
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    })
    // Used to avoid event bubbling (that parents' events are triggered as well)
    event.stopPropagation();
});