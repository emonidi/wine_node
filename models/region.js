var mysql = require('mysql');
var db = mysql.createConnection({
	host:'mysql9.000webhost.com',
	user:'a3458850_wine',
	password:'Emo05051981',
	database:'a3458850_wine'
});

exports.insertRegion = function(postData,callback){
	db.query("Insert into regions (region_name, region_description) values ('"+postData.region_name+"','"+postData.region_description+"')",function(err,rows){
		callback(err,rows);
	});
}

exports.getRegions = function(callback){
	db.query("SELECT * from regions",function(err,rows){
		callback(err,rows);
	});
}


exports.getRegionById =  function(regionId,callback){
	db.query("SELECT * FROM regions WHERE id = "+regionId,function(err,rows){
		callback(err,rows);
	});
};

exports.editRegion = function(postData,regionId,callback){
	db.query("UPDATE regions set region_name = '"+postData.region_name+"', region_description = '"+postData.region_description+"' WHERE id = "+regionId,
		function(err,rows){
			callback(err,rows);
		}
	)
}

