var um = require("../");
 
 
var dboptions = {
	host: "127.0.0.1",
	port: 27017,
	name: "service"
};

um.initialize(dboptions, function(err){
	printResult('initialize', err);

	
});



var printResult = function (msg, err){
	if(err){
		console.log(msg + " FAIL - " + err.message);
	}
	else{
		console.log(msg + " SUCCESS");
	}
};