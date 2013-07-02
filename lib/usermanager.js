
var ObjectUtil = require('./objectutil.js'); 

var UserManager = function(){

	// A root key object will also be created.
	this.generateNewUser = function (callback){
		callback = callback || function(){};
		
	};	
	
	this.getUser = function (user_id, callback){
		callback = callback || function(){};
	
	};
	
	this.addOProfile = function (callback){
		callback = callback || function(){};
	
	};
	
	// User, keys and oprofiles are all deleted.
	this.deleteUser = function (callback){
		callback = callback || function(){};
	
	};
	
	
	this.getOProfilesOfUser = function (user_id, callback){
		callback = callback || function(){};
	
	};
	
	
	this.generateNewKeyForUser = function (user_id, callback){
		callback = callback || function(){};
	
	};
	
	
	this.getKey = function (key_id, callback){
		callback = callback || function(){};
	
	};
	
	this.getKeysOfUser = function (user_id, callback){
		callback = callback || function(){};
	
	};
	
	// Do nothing to user_a.
	// Update the user_id property of oprofile and key objects of user_b. Remove the root key of the user_b.
	// 
	this.mergeUsers = function(user_a, user_b, callback){
		callback = callback || function(){};
		
	};
};