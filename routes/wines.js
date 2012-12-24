var wineModel = require('../models/mwine');

exports.add = function(req,res){
	if(req.session.username){
		var producerModel = require('../models/mproducer');
		var data = new Object;
		data.producers = new Object;

		producerModel.getProducersNames(function(err,rows){
			data.producers=rows;
			console.log(rows);
			res.render('wines/add',data);
		});


		
	}else{
		req.session.ref = req.url;

		res.redirect('/login');
	}
}	

exports.index = function(req,res){
	res.render('small_header')
}	


exports.adder = function(req,res){
	var postData = req.body;
	wineModel.createWine(postData,function(err,rows){
		if(rows){
			res.redirect('/wines');
		}else{
			res.send(err);
		}
	});
}

exports.list = function(req,res){
	wineModel.getWineList(function(err,rows){
		if(rows){
			var data = new Object;
			data.rows = rows;
			//res.send(rows);
			res.render('list_wines',data)
		}else{
			res.send(err);
		}
	});
}

exports.edit = function(req,res){
	var wineId  = req.url.split("/")[3];
	
	wineModel.getWineById(wineId,function(err,rows){
		if(rows){
			var data = new Object;
			data.wine = rows[0]
			var producerModel = require('../models/mproducer');
			producerModel.getProducersNames(function(err,rows){
				if(rows){
					data.producers = rows;
					//res.send(data);
					res.render('edit_wine',data);
				}else{
					res.send(err)
				}
			});
		}else{
			res.send(err);
		}
	});
}

exports.editor = function(req,res){
		var wineId  = req.url.split("/")[3];
		var postData = req.body;
		wineModel.updateWine(wineId,postData,function(err,rows){
			if(rows){
				res.redirect('/wines/view/'+wineId);
			}
		});
}

exports.view = function(req,res){
	var wineId  = req.url.split("/")[3];
	wineModel.getWineById(wineId,function(err,rows){
		if(rows){
			res.send(rows);
		}
	}) 
}
