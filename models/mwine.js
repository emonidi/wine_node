var mongojs = require('mongojs');
var db = mongojs('mongodb://emonidi:emoemo@linus.mongohq.com:10057/wines',['wines']);


exports.createWine = function(postData,callback){
	db.wines.save(postData,function(err,rows){
		callback(err,rows);
	});
}

exports.getWineList = function(callback){
	db.wines.find({},{wine_name : 1,producer_name : 1},function(err,rows){
		console.log(rows);
		callback(err,rows);
	});
}

exports.getWineById = function(wineId,callback){
	var objectId = mongojs.ObjectId(wineId);
	db.wines.find({"_id":objectId},function(err,rows){
		callback(err,rows);
	});
}

exports.updateWine = function(wineId,postData,callback){
		var objectId = mongojs.ObjectId(wineId);
		db.wines.update({"_id" : objectId},postData,function(err,rows){
			console.log(rows);
			callback(err,rows);
		});
}