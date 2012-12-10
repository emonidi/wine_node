var mysql = require('mysql');
var db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'trip'
});

exports.insertProducer  = function(postData,callback){
	
	db.query("INSERT INTO producers (producer_name,producer_town ,region_id, producer_description) values ('"+postData.producer_name+"','"+postData.producer_town+"','"+postData.region_id+"','"+postData.producer_description+"')",
		function(err,rows){
			
			callback(err,rows);
		}
	)
}


exports.getProducers = function(callback){
	db.query('SELECT producers.id,producers.producer_name, SUBSTRING(producers.producer_description,1,100) as producer_description,producers_images.image_name FROM producers LEFT JOIN producers_images on producers.id = producers_images.producer_id GROUP BY producers.id',function(err,rows){
	
		callback(err,rows);
	});
}

exports.getProducerById = function(producerId,callback){
	
	db.query("SELECT producers.id,producers.producer_name,producers.region_id,producers.producer_description,regions.region_name,producers.producer_town, null as image_name, null as image_id FROM 	producers JOIN 	regions ON producers.region_id = regions.id WHERE 	producers.id = "+producerId+" UNION SELECT 	null as id, null as producer_name, null as region_id, null as producer_descripion, null as region_name, null as producer_town,image_name,id FROM producers_images WHERE producer_id = "+producerId,function(err,rows){
		
		callback(err,rows);
	});
}

exports.addImage = function(data,callback){

	db.query("INSERT INTO producers_images ( image_name , producer_id ) values ( '"+data.image_name+"', '"+data.producer_id+"')",
		function(err,rows){
		
		callback(err,rows);
	});
}

exports.updateProducer = function(producerId,postData,callback){
	db.query(" update producers set producer_name = '"+postData.producer_name+"' , region_id = '"+postData.region_id+"' , producer_town = '"+postData.producer_town+"' , producer_description = '"+postData.producer_description+"' where id = "+producerId,function(err,rows){
	    console.log(err);
		callback(err,rows);
	});
};

exports.getProducersNames = function(callback){
	db.query("SELECT id, producer_name from producers",function(err,rows){
		callback(err,rows);
	})
}