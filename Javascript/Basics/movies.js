//  Practicing using objects nested in arrays 
var movies = [
	{
		title: "Booksmart",
		rating: 5.0,
		hasWatched: true
	},
	{
		title: "Avengers Endgame",
		rating: 3.0,
		hasWatched: false
	}
]

movies.forEach(function(movie){
	var res = "You have "
	if (movie.hasWatched){
		res += "watched "
	}else{
		res += "not seen "
	}
	res +=  "\"" + movie.title + "\" - ";
	res += movie.rating + " stars"

	console.log(res)
})