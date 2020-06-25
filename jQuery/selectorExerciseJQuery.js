//  <!-- Exercise -->
//     <!-- 1. Select all divs and make background purple -->
$("div").css("background", "purple");
//     <!-- 2. Select divs w/class highlight and make them 200px wide -->
$(".highlight").css("width", "200px");
//     <!-- 3. Select div w/id third and give it orange border -->
$("#third").css("border", "10px solid orange");
//     <!-- BONUS: Select first div only and make font color pink -->
$("div:first-of-type").css("color", "pink");
// This option also works, but is slightly slower as first-of-type is a built in type and first needs to be loaded to work
// $("div:first").css("color", "pink");
