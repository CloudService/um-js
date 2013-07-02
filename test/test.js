var um = require("../");
var step = require("step");
 
 
var dboptions = {
	host: "127.0.0.1",
	port: 27017,
	name: "service"
};

um.initialize(dboptions, function(err){
	printResult('initialize', err);
	
	var user_id = "";
	var key_id = "";
	
	step(
		function generateNewUser(){
			var userOptions = {
				name: "Jeffrey Sun"
			};
			
			um.generateNewUser(userOptions, this);		
		},
		function verifygetUser(err, user){
			printResult('generateNewUser', err);
			
			user_id = user.id;
			console.log(JSON.stringify(user));
			um.getUser(user.id, this);
		},
		function verifyGetKeysOfUser(err, user){
			printResult('verifygetUser', err);
			
			
			um.getKeysOfUser(user.id, this);
		},
		function verifyGetKey(err, keys){
			printResult('verifyGetKeysOfUser', err);			
			
			console.log(JSON.stringify(keys));
			
			key_id = keys[0].id;
			
			um.getKey(key_id, this);
		} ,
		function verifyDeleteUser(err){
			printResult('verifyGetKey', err);			

			um.deleteUser(user_id, this);
		} ,
		function finish(err){
			printResult('verifyDeleteUser', err);			
			
		}	
	);	
});

var printResult = function (msg, err){
	if(err){
		console.log(msg + " FAIL - " + err.message);
	}
	else{
		console.log(msg + " SUCCESS");
	}
};