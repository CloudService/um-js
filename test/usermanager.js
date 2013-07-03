var um = require("../");
var should = require("should");

var user_id = "";
var key_id = "";
		
describe('UserManager', function(){
	before(function(done){
		var dboptions = {
			host: "127.0.0.1",
			port: 27017,
			name: "service"
		};

		um.initialize(dboptions, function(err){
			done(err);
		});	
	});

	it(' .generateNewUser should return new created user', function(done){

		var userOptions = {
			name: "Jeffrey Sun"
		};
		
		um.generateNewUser(userOptions, function(err, user){
	
			should.not.exist(err);
			should.exist(user);
			user.should.have.property('id');
			user.should.have.property('name', 'Jeffrey Sun');
			
			user_id = user.id;
			done();	
		});			
	});
	
	it(' .getUser should return the new user', function(done){

		um.getUser(user_id, function(err, user){
	
			should.not.exist(err);
			should.exist(user);
			user.should.have.property('id');
			user.should.have.property('name', 'Jeffrey Sun');

			done();	
		});			
	});
	
	it(' .getKeysOfUser should return one key for the new user', function(done){

		um.getKeysOfUser(user_id, function(err, keys){
	
			should.not.exist(err);
			should.exist(keys);			
			keys.should.have.length(1);			
			keys[0].level.should.equal('root');
			keys[0].user_id.should.equal(user_id);
			
			key_id = keys[0].id;

			done();	
		});			
	});
	
	it(' .getKey should return the key', function(done){

		um.getKey(key_id, function(err, key){
	
			should.not.exist(err);
			should.exist(key);			
			key.level.should.equal('root');
			key.user_id.should.equal(user_id);
			
			done();	
		});			
	});
	
	it(' .deleteUser should be success', function(done){

		um.deleteUser(user_id, function(err){
	
			should.not.exist(err);
			
			done();	
		});			
	});
	
	it(' .getUser should return empty for the deleted user', function(done){

		um.getUser(user_id, function(err, user){
	
			should.not.exist(err);
			should.not.exist(user);	

			done();	
		});			
	});
	
	it(' .getKey should return empty for the deleted user', function(done){

		um.getKey(key_id, function(err, key){
	
			should.not.exist(err);
			should.not.exist(key);
			
			done();	
		});			
	});

});
