var high = document.getElementById("highlight");
// Returns HTML collection of elements with said class name (to access just javascript object access [0])
var bold = document.getElementsByClassName("bolded");
// Returns all elements with matching tag names in a list (even if it's just 1 element)
var tag = document.getElementsByTagName("li");

// Query selector (returns first element that matches a given CSS style selector)
var highID = document.querySelector("#highlight")

// Only returns first match!
var boldID = document.querySelector(".bolded")
// Using selectorAll to get the Node list of elements that match said description instead (not only first match)
var boldListID = document.querySelectorAll(".bolded")