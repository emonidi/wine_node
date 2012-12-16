var mongojs = require('mongojs');
var db = mongojs('mongodb://emonidi:emoemo@linus.mongohq.com:10057/wines',['regions']);
exports.createRegion = function(data,callback){

	db.regions.save(data,function(err,rows){
		callback(err,rows);
	});
}

exports.getAllRegions  = function(callback){
	db.regions.find(function(err,rows){
		callback(err,rows);
	});
}

exports.getRegionById = function(regionId,callback){
	var objectId = mongojs.ObjectId(regionId);
	
	db.regions.find({_id:objectId},function(err,rows){
		callback(err,rows);
	});
}

exports.editRegion = function(regionId,postData,callback){
	
	var objectId = mongojs.ObjectId(regionId);
	db.regions.update({_id:objectId},postData,function(err,rows){

		callback(err,rows);
	});

}

exports.delete = function(regionId,callback){
		var objectId = mongojs.ObjectId(regionId);
		db.regions.remove({_id:objectId},function(err,rows){
			callback(err,rows);
		});
}

