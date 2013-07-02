
var uuid = require('node-uuid'); //  Generate UUID.  var id = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

/**
 * @constructor
 */
var ObjectUtil = function(){
	/**
	 * Generate the user object
	 The object schema is:
	 {
		"type": "user",
		"id": "1b01e780-1cee-11e2-be8a-c3cbb3c93476",
		"name": "jeffrey sun",
		"created_at": "2012-04-05T13:47:14Z"
	}
	 * @param {Object} options
	 *	@param {string}  options.id - Optional, if it isn't specified, a new generated one will be assigned.
	 *	@param {string}  options.name - The name.
	 */
	this.generateUserObject = function(options){
		// Initialize the default object to avoid crash.
		options = options || {};
		
		var obj = {
			"type": "user",
			"id": options.id || uuid.generateGUID(),
			"name": options.name,
			"created_at": new Date()
		};

		return obj;
	};
	
	/**
	 * Generate the key object
	 The object schema is:
	 {
		"type": "key",
		"id": "a8a9ce20-693a-11e1-8e4c-99734085a5cf",
		"level": "root",
		"user_id": "1b01e780-1cee-11e2-be8a-c3cbb3c93476",
		"created_at": "2012-04-05T13:47:14Z",
		"expired_at": "2012-04-15T13:47:14Z"
	}
	 * @param {Object} options
	 *	@param {string}  options.id - Optional, if it isn't specified, a new generated one will be assigned.
	 *	@param {string}  options.user_id - The parent user id.
	 *	@param {string}  options.level - The key level.
	 *	@param {Date}  options.expired_at - The expire date.
	 */
	this.generateKeyObject = function(options){
		// Initialize the default object to avoid crash.
		options = options || {};
		
		var obj = {
			"type": "key",
			"id": options.id || uuid.generateGUID(),
			"level" : options.level,
			"user_id": options.user_id,
			"created_at": new Date(),
			"expired_at": options.expired_at
		};

		return obj;
	};
	
	/**
	 * Generate the oprofile object
	 The object schema is:
	{
		"type": "oprofile",
		"id": "c8a9ce20-643a-1ae1-7e4c-b9734085a5ca",
		"provider": "box",
		"user_id": "1b01e780-1cee-11e2-be8a-c3cbb3c93476",
		"detail": {},
		"oauth": {},
		"created_at": "2012-04-05T13:47:14Z"
	}
	 * @param {Object} options
	 *	@param {string}  options.id - Optional, if it isn't specified, a new generated one will be assigned.
	 *	@param {string}  options.provider - The profile provider.
	 *	@param {string}  options.user_id - The parent user id.
	 */
	this.generateOProfileObject = function(options){
		// Initialize the default object to avoid crash.
		options = options || {};
		
		var obj = {
			"type": "oprofile",
			"id": options.id || uuid.generateGUID(),
			"provider": options.provider,
			"user_id": options.user_id,
			"detail": options.detail,
			"oauth": options.oauth,
			"created_at": new Date()
		};

		return obj;
	};
};

/**********************************************************************/
// Exports
/**********************************************************************/

module.exports = new ObjectUtil();