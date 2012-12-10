exports.add = function(req,res){
	if(req.session.username){
		var producerModel = require('../models/producer');
		var data = new Object;
		data.producers = new Object;

		producerModel.getProducersNames(function(err,rows){
			data.producers = rows;
			return data;
		});

		var interval = setInterval(function(){
			if(data.producers.hasOwnProperty){
				clearInterval(interval);
				res.render('wines/add',data);
			}
		});


		
	}else{
		req.session.ref = req.url;

		res.redirect('/login');
	}
}	

exports.index = function(req,res){
	res.render('small_header')
}	