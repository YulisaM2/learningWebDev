var correct = false

// while(!correct){
// 	var ans = prompt("Are we there yet?")
// 	if (ans === "yes"){
// 		correct = true
// 	}
// }

while(!correct){
	var ans = prompt("Are we there yet?")
	// If you can find yes somewhere in the stream of thext
	if (ans.indexOf("yes") !== -1){
		correct = true
	}
}

alert("YAY! We made it")