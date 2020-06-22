var todos = [];
window.setTimeout(function() {

	function listTodo(){
		// console.log(todos);
		todos.forEach(function(item, i, list){
			console.log(i + " : " + item)
		})
	}

	function addTodo(){
		var newTodo = prompt("Enter new todo item");
		todos.push(newTodo);
		console.log("Added todo")
	}

	function deleteTodo(){
		var deleteTodo = prompt("What is the index of the item to be deleted?");
		// Delete 1 item starting from index deleteTodo
		todos.splice(deleteTodo,1);
		console.log("Deleted todo")
	}

	var input = prompt("What would you like to do now?");
	while(input !== "quit"){
		if(input === "list"){
			listTodo();
		}else if(input === "new"){
			addTodo();
		}else if (input === "delete"){
			deleteTodo();
		}
		var input = prompt("What would you like to do now?");
	}
	console.log("Quitting app!")
}, 500);

