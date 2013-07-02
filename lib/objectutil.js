
var uuid = require('node-uuid'); //  Generate UUID.  var id = uuid.v1(); // -> '6c84fb90-12c4-11e1-840d-7b25c5ee775a'

/**
 * @constructor
 */
var ObjectUtil = function(){
	/**
	 * Generate the user object
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
	 * @param {Object} options
	 *	@param {string}  options.id - Optional, if it isn't specified, a new generated one will be assigned.
	 *	@param {string}  options.user_id - The parent user id.
	 */
	this.generateKeyObject = function(options){
		// Initialize the default object to avoid crash.
		options = options || {};
		
		var obj = {
			"type": "key",
			"id": options.id || uuid.generateGUID(),
			"user_id": options.user_id,
			"created_at": new Date(),
			"expired_at": options.expired_at
		};

		return obj;
	};
	
	/**
	 * Generate the oprofile object
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