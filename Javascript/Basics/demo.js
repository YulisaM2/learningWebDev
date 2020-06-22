// Basic exercises for prompt, alerts and console logs

// 1. Greeting user
// var name = prompt("Hello from the JS file! What's your name?")
// alert("Hey " + name + " nice meeting you")
// console.log("Greetings from the console " + name)

// 2. Displaying user's info on console
// var name = prompt("What is your name?")
// var lastName = prompt("What is your last name?")
// var age = prompt("What is your age?")

// console.log("The user's full name is " + name + " " + lastName + " and is " + age + " years old")

// 3. Age to days calculator (simple)
// var age = prompt("What is your age?");
// // Using 1/4 to account for leap years (roughly)
// var toDays = age * 365.25;
// alert("You have been alive for around " + toDays + " days!")

// 4. Simple conditional testing

var age = Number(prompt("What is your age?"));
 
// If age is negative
if(age < 0) {
 console.log("Come back once you're out of the womb");
}
 
// If age is 21  
if(age === 21) {
 console.log("Happy 21st Birthday!");
}
 
// If age is odd
//(not evenly divisible by two)
if(age % 2 !== 0) {
 console.log("Your age is odd!");
}
 
// If age is a perfect square
if(age % Math.sqrt(age) === 0) {
  console.log("Your age is a perfect square!");
}