var mongojs = require('mongojs');
var db = mongojs('mongodb://emonidi:emoemo@linus.mongohq.com:10057/wines',['users']);

exports.getUserByUsername = function(username,callback){

	db.users.find({'username':username},function(err,rows){
		callback(err,rows);
	});
}
