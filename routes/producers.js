var producerModel  = require('../models/producer');

exports.add = function(req,res){
	if(req.session.username){
	var regionModel = require('../models/region');

		regionModel.getRegions(function(err,rows){
			
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
			var data  = new Object();
			data.rows = rows;
			if(req.session.username){
				data.loged = true;
			}else{
				data.loged =  false;
			}
			res.render("list_producers",data);
		}
	});
}

 exports.view = function(req,res){
 	var producerId = req.url.split("/")[3];
 	producerModel.getProducerById(producerId,function(err,rows){
 		if(rows){
 			var data = new Object;
 			data.images = new Array;
 			data.rows = rows[0];
 			var c = 0;
 			for(var i in rows){
 				if(rows[i]['image_name']){
 					data.images[c++] = {"image_name":rows[i]['image_name'],"image_id":rows[i]['image_id']}

 				}
 			}



 			if(req.session.username){
 				data.loged = true;
 			}else{
 				data.loged = false;
 			}
 			
 			res.render('view_producer',data);
 		}
 	});
 }


exports.adder = function(req,res){
	var postData = req.body;

	producerModel.insertProducer(postData,function(err,rows){
		if(rows.affectedRows == 1){
			res.redirect("/producers");
		}
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
		var postData = new Array;
		postData['image_name'] = image_name;
		postData['producer_id'] = producerId;
		producerModel.addImage(postData,function(err,rows){
			res.redirect('/producers/view/'+producerId);
		});
	}else{
		res.redirect('/producers/view/'+producerId);
	}
}


exports.edit  = function(req,res){
      
		if(req.session.username !==''){
		var producerId  = req.url.split('/')[3];
 		var regions = new Object;
 		var regionModel = require('../models/region');
 		regionModel.getRegions(function(err,rows){
 			regions = rows;
 			return regions;
 		});
		producerModel.getProducerById(producerId,function(error,rows){
			
		    var data = new Object;
		    data.producer  = rows['0'];
		    
		    data.images = new Array;
		    var c = 0;
		    for (var i in rows){
		    	if(rows[i]['producer_name'] !== null){
		    		data.images[c] = {"image_name":rows[i]['image_name'],'image_id':rows[i]['image_id']}
		    	}
		    }
			
			var interval = setInterval(function(){
				if(regions.hasOwnProperty){
					clearInterval(interval);
					data.regions = regions;
					res.render('edit_producer',data);

				}
			});
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
		if(rows.affectedRows == 1){
			res.redirect('/producers/view/'+producerId);
		}
	});
}