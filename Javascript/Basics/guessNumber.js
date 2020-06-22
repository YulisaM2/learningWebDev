const num = 4;
var guess = Number(prompt("What is your guess?"));

if (guess === num){
	alert("CONGRATULATIONS! You are correct!")
}else if (guess > num){
	alert("Too high! :( Try again")
}else{
	alert("Too low! :( Try again")
}