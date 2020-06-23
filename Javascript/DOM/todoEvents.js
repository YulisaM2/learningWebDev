var lis = document.querySelectorAll("li");

for(var i = 0;i < lis.length; ++i){
    // Change color to green when mouse is hovering over element
    lis[i].addEventListener("mouseover",function(){
        this.classList.add("selected");
    });
    
    // Change color to default (black) once the mouse is out of the element's range
    lis[i].addEventListener("mouseout", function(){
        this.classList.remove("selected");
    });

    // If clicked, strike/de-strike the element 
    lis[i].addEventListener("click", function(){
        this.classList.toggle("done");
    });
}
