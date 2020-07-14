function average(arr){
	var avg = 0;
	// for(var i = 0; i < arr.length; ++i){
	// 	avg +=arr[i];
	// }
	
	arr.forEach(function(ele){
		avg+= ele;
	});
	
	avg /= arr.length;
	return Math.round(avg);
};


console.log(average([90,98,89,100,100,86,94])); // should return 94
console.log(average([40,65,77,82,80,54,73,63,95,49])); // should return 68