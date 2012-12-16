var producerModel  = require('../models/mproducer');

exports.add = function(req,res){
	if(req.session.username){
	var regionModel = require('../models/mregion');

		regionModel.getAllRegions(function(err,rows){
			
			var data = new Object;
			data.rows = rows;
			res.render('add_producer',data);
		});
		
		
		
	}else{
		req.session.ref  = req.url;
		res.redirect('/login');
	}
}

exports.list = function(req,res){
	producerModel.getProducers(function(err,rows){
		if(rows){
			
			var data =  new Object;
			data.rows = rows;
			var dataRowsLength = data.rows.length - 1;
			var producersId  ='';
				for(var i in data.rows){
					producersId = producersId + "'"+data.rows[i]._id+"',";
					producerModel.getProducerImages(data.rows[i]._id,function(err,rows){
						console.log(rows);
					});
				}

				//res.send(producersId);
				res.render('list_producers',data)
			}
			
		
		
	});
}
	
 exports.view = function(req,res){
 	
 	var producerId = req.url.split("/")[3];
 	producerModel.getProducerById(producerId,function(err,rows){
		if(rows){
			var regionModel  = require("../models/mregion");
			var data = new Object;
 			data.rows = rows[0];


 			
 			data.images = '';
 			if(req.session.username){
 				data.loged = true;
 			}else{
 				data.loged = false;
 			}
 			
 			var regionModel = require('../models/mregion');
 			regionModel.getRegionById(data.rows.region_id,function(err,r){
 				data.rows.region_name = r[0].region_name;
 				res.render('view_producer',data);
 				//data.rows.region_name = rows
 			});

 			//regionModel.getProducerById()
 		
 		
 				
 			

		} 	
 	});
 }


exports.adder = function(req,res){
	var postData = req.body;

	producerModel.insertProducer(postData,function(err,rows){
		throw err,
		res.redirect('/producer/view/'+rows._id);	
	});

}

exports.imageAdder = function(req,res){
	var file = req.files.image;
	var producerId = req.body.producer_id;
	
	if(file.type == 'image/jpg' || file.type =='image/png' || file.type =='image/jpeg'){
		var imageHelper = require('../helpers/fileupload');		
		var image_name = file.name;
		var path = './public/images/producers';
		imageHelper.upload(file,path);
		var postData = new Object;
		postData['image_name'] = image_name;
		postData['producer_id'] = producerId;
		producerModel.addImage(postData,function(err,rows){
			if(rows){
				res.redirect('/producers/view/'+producerId);
			}
		});
	}else{
		res.redirect('/producers/view/'+producerId);
	}
}


exports.edit  = function(req,res){
    if(req.session.username){
    	var producerId = req.url.split('/')[3];

    	producerModel.getProducerById(producerId,function(err,rows){
    		if(rows){
    			var data = new Object;
    			data.producer = rows[0];
    			var regionModel = require('../models/mregion');
    			regionModel.getAllRegions(function(err,rows){
    				if(rows){
    					data.regions = rows;
    				}else{
    					data.regions = '';
    				}

    				res.render('edit_producer',data);
    			});
    		}
    	});	
	}else{
		req.session.ref=req.url;
		res.redirect('login');
	}
}


exports.editor = function(req,res){
	var producerId = req.url.split('/')[3];
	var postData = req.body;
	producerModel.updateProducer(producerId,postData,function(err,rows){
		if(rows){
			res.redirect('/producers/view/'+producerId);
		}
	});
}


exports.delete = function(req,res){
	var producerId = req.url.split('/')[3];
	res.send(producerId);
}
