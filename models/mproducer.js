var mongojs = require('mongojs');
var db = mongojs('mongodb://emonidi:emoemo@linus.mongohq.com:10057/wines',['producers']);

exports.insertProducer = function(postData,callback){
	
	db.producers.save(postData,function(err,rows){
		callback(err,rows);
	});
}


exports.deleteProducer = function(producerId,callback){
	var objectId = mongojs.ObjectId(producerId);
	db.producers.remove({_id:objectId},function(err,rows){
		callback(err,rows);
	});
}

exports.getProducers = function(callback){
	db.producers.find(function(err,res){
		callback(err,res);
	});
}

exports.getProducerById = function(producerId,callback){
		var objectId = mongojs.ObjectId(producerId);
		db.producers.find({_id:objectId},function(err,rows){
			callback(err,rows);
		});
}

exports.updateProducer = function(producerId,postData,callback){
	var objectId = mongojs.ObjectId(producerId);
	db.producers.update({_id:objectId},postData,function(err,rows){
		callback(err,rows);
	});
}

exports.addImage = function(postData,callback){
	var objectId = mongojs.ObjectId;
	
	db.producers.update({_id:objectId(postData.producer_id)},{ $push : {images : {'image_name' : postData.image_name} } },function(err,rows){
			
		callback(err,rows);
	});
}

exports.getProducerImages = function(producerId,callback){
	console.log(producerId);

	
	var db = mongojs('mongodb://emonidi:emoemo@linus.mongohq.com:10057/wines',['producer_images']);
	db.producer_images.find({ producer_id : producerId},function(err,rows){
		console.log(producerId);
		callback(err,rows)
	});
}

exports.getProducersNames = function(callback){
	db.producers.find({},{producer_name : 1},function(err,rows){
		callback(err,rows);
	});
}


exports.getProducerIndex = function(callback){
    db.producers.find(function(err,rows){
       callback(err,rows);
    }).limit(3);
}