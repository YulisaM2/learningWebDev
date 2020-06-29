// Strike element when selected
// Using on function because new elements could be created later and we want to add listeners to them too 
// By using on with the parent element(which is created during 1st instance) we can do this
// This JQuery method means add a click listener to the li elements inside the ul 
$("ul").on("click", "li", function(){
   
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
// This JQuery method means add click listener to spans inside the ul
$("ul").on("click", "span", function(event){

    // To remove li (element enclosing the span/parent) 
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    })
    // Used to avoid event bubbling (that parents' events are triggered as well)
    event.stopPropagation();
});

// Adding new element to list
$("input[type='text']").keypress(function(event){
    // If enter is pressed, add element
    if (event.which === 13){
        var todoText = $(this).val();
        $(this).val("");
        $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
    }
});

$(".fa-plus").click(function(){
    $("input[type='text']").fadeToggle();
});