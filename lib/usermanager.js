var async = require('async');
var step = require('step');
var objectutil = require('./objectutil.js'); 
var mongostream = require('mongostream')();


var UserManager = function(){

	var collections = {
		user : "user",
		key : "key",
		oprofile : "oprofile"
	};
	
	var keyLevels = {
		root: "root",
		normal: "normal"
	};
	
	/**
	 * @function Initialize the user manager. This function must be called prior to any others.
	 * Open the database by using the options.
	 * @param {Object} options 
	 * 	@param {string} options.host - The db host ip or name.
	 * 	@param {string} options.port - The listening port of db.
	 * 	@param {string} options.name - The database name.
	 * 	@param {string} options.username - Optional. The username of the database. 
	 * 	@param {string} options.password - Optional. The password of the database.
	 * @param {Function} callback(err)
	 * @return this for chain
	 */
	this.initialize = function(options, callback){
	
		callback = callback || function(){};
		
		mongostream.addSupportedCollections([collections.user, collections.key, collections.oprofile]);
		
		mongostream.open(options, function(err){
			callback(err);
		});
		
		return this;	
	};	
	
	/**
	 * @function 
	 * A root key object will also be created.
	 * Create a new user and the root key.
	 * @param {Object} userOptions
	 *	@param {string}  userOptions.id - Optional, if it isn't specified, a new generated one will be assigned.
	 *	@param {string}  userOptions.name - The name.
	 * @param {Function} callback(err, user)
	 * @return this for chain
	 */
	this.generateNewUser = function (userOptions, callback){
		callback = callback || function(){};
		
		var userObj = objectutil.generateUserObject(userOptions);
		
		// Insert the new user to database
		mongostream.insert(collections.user, userObj, function(err){
			if(err){
				callback(err);
				return;			
			}
			
			var keyOptions = {
				user_id : userObj.id,
				level: keyLevels.root // The default key MUST be root.			
			};
			var keyObj = objectutil.generateKeyObject(keyOptions);
			
			mongostream.insert(collections.key, keyObj, function(err){
				if(err){
					callback(err);
					return;			
				}
				
				callback(null, userObj);			
			});
		});
		
		return this;	
	};	
	
	/**
	 * @function Return the user with the specific id.
	 * @param {string} user_id, the user id.
	 * @param {Function} callback(err, userObj)
	 * @return this for chain
	 */
	this.getUser = function (user_id, callback){
		if(!callback){
			return this;
		}
		
		mongostream.queryByID(collections.user, user_id, callback);
	
		return this;
	};
	
	/**
	 * @function Delete the user and the corresponding keys and oprofiles.
	 * @param {string} user_id, the user id.
	 * @param {Function} callback(err)
	 * @return this for chain
	 */
	this.deleteUser = function (user_id, callback){
		callback = callback || function(){};
		
		var self = this;
		var oprofileCol = collections.oprofile;
		var keyCol = collections.key;
		var userCol = collections.user;
		
		var queryOptions = {
			user_id: user_id
		};
		
		step(
			function deleteOprofiles(){
				mongostream.removeByOptions(oprofileCol, queryOptions, this);
			},
			function deleteKeys(err){
				if(err) throw err;
				
				mongostream.removeByOptions(keyCol, queryOptions, this);
			},
			function deleteKeys(err){
				if(err) throw err;
				mongostream.removeByID(userCol, user_id, this);
			},
			function finalize(err){
				callback(err);
			}
		);
		
		return this;
	};
	
	/**
	 * @function Add an open profile for a user
	 * @param {string} user_id, the user id.
	 * @param {Object} profileOptions
	 *	@param {string}  profileOptions.id - Optional, if it isn't specified, a new generated one will be assigned.
	 *	@param {string}  profileOptions.user_id - The corresponding user id of this profile.
	 *	@param {string}  profileOptions.provider - The provider.
	 *	@param {Object}  profileOptions.detail - The detail information.
	 *	@param {Object}  profileOptions.oauth - The outh information.
	 * @param {Function} callback(err, oprofile)
	 * @return this for chain
	 */
	this.addOProfile = function (profileOptions, callback){
		callback = callback || function(){};
		
		var oprofileObj = objectutil.generateOProfileObject(profileOptions);
		
		// Insert the new oprofile to database
		mongostream.insert(collections.oprofile, oprofileObj, callback);
		
		return this;
	};
	
	/**
	 * @function Get the oprofile array with the specific user id.
	 * @param {string} user_id, the user id.
	 * @param {Function} callback(err, oprofileArray)
	 * @return this for chain
	 */
	this.getOProfilesOfUser = function (user_id, callback){
		if(!callback){
			return this;
		}		
		
		var queryOptions = {
			user_id: user_id
		};
		mongostream.queryByOptions(collections.oprofile, queryOptions, callback);
		
		return this;
	};
	
	/**
	 * @function Create a new key object. The level is set to be 'normal'
	 * @param {string} user_id, the user id.
	 * @param {Function} callback(err, key)
	 * @return this for chain
	 */
	this.generateNewKeyForUser = function (user_id, callback){
		callback = callback || function(){};		
		
		var keyOptions = {
			user_id : user_id,
			level: keyLevels.normal 			
		};
		var keyObj = objectutil.generateKeyObject(keyOptions);
		
		mongostream.insert(collections.key, keyObj, callback);
			
		return this;
	};
	
	/**
	 * @function Get the key with the specified key id
	 * @param {string} key_id, the key id.
	 * @param {Function} callback(err, key)
	 * @return this for chain
	 */
	this.getKey = function (key_id, callback){
		if(!callback){
			return this;
		}
		
		mongostream.queryByID(collections.key, key_id, callback);
		return this;
	};
	
	/**
	 * @function Get the key array with the specific user id.
	 * @param {string} user_id, the user id.
	 * @param {Function} callback(err, keyArray)
	 * @return this for chain
	 */
	this.getKeysOfUser = function (user_id, callback){
		if(!callback){
			return this;
		}		
		
		var queryOptions = {
			user_id: user_id
		};
		mongostream.queryByOptions(collections.key, queryOptions, callback);
		
		return this;
	};
	
	// Do nothing to user_a.
	// 
	// 
	/**
	 * @function Merge the keys and oprofiles of user_b into user_a.
	 * Do nothing to user_a.
	 * Update the user_id property of oprofile and key objects of user_b. The root key of the user_b will become normal level. Delete the user_b.
	 * @param {Function} callback(err)
	 * @return this for chain
	 */
	this.mergeUsers = function(user_a, user_b, callback){
		callback = callback || function(){};
		
		var self = this;
		var oprofileCol = collections.oprofile;
		var keyCol = collections.key;
		var userCol = collections.user;
		
		var rootLevel = keyLevels.root;
		var normalLevel = keyLevels.normal;
		
		var user_id_a = user_a.id;
		
		step(
			function getOProfilesOfUserB(){			
				self.getOProfilesOfUser(user_b.id, this);
			},
			function updateOProfiles(err, profileArray){
				if(err) throw err;
				
				var updateProfile = function(profile, callback){
					mongostream.updateByID(oprofileCol, profile, callback);
				};
				
				// ToDo - Does it works if the array is empty?
				profileArray.forEach(function(element, index, array){
					element.user_id = user_id_a;			
				});
				
				// ToDo - The data will be inconsist if part of the profiles are updated.
				async.each(profileArray, updateProfile, this);				
			},			
			function getKeysOfUserB(err){
				if(err) throw err;
				self.getKeysOfUser(user_b.id, this);
			},
			function updateOProfiles(err, keyArray){
				if(err) throw err;
				
				var updateKey = function(key, callback){
					mongostream.updateByID(keyCol, key, callback);
				};
				
				// ToDo - Does it works if the array is empty?
				keyArray.forEach(function(element, index, array){
					element.user_id = user_id_a;
					if(element.level === rootLevel)
						element.level = normalLevel;
				});
				
				// ToDo - The data will be inconsist if part of the keys are updated.
				async.each(keyArray, updateKey, this);			
			},
			function deleteUserB(err){
				if(err) throw err;
				
				mongostream.removeByID(userCol, user_b.id, this);
			},
			function finalize(err){
				callback(err);
			}		
		);
		
		return this;	
	};
};

/**********************************************************************/
// Exports
/**********************************************************************/

module.exports = new UserManager();