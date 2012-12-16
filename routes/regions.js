var regionModel = require('../models/mregion');
exports.addView = function(req,res){
	if(req.session.username){
		var data = new Object;
			data.title = "Добавяне на Регион";
		res.render('add_region',data);
	}else{
		req.session.ref = req.url;
		res.redirect('/login');
	}
}

exports.add = function(req,res){
	var postData = req.body;
	var regionModel = require('../models/mregion');
	regionModel.createRegion(postData,function(err,rows){
		res.redirect('/regions');
	});
}

exports.list = function(req,res){
   
	regionModel.getAllRegions(function(err,rows){
		if(rows){
			var data = new Object;
			data.rows  = rows;
			
			res.render('list_regions',data);
		}
	})
	
}

exports.edit = function(req,res){

	if(req.session.username){
			var regionId = req.url.split("/")[3];
	
		if(regionId && regionId !== ''){
			regionModel.getRegionById(regionId,function(err,rows){
				var data = new Object;
				data.title = "Редакция на Регион";
				data.region_name=rows[0]['region_name'];
				data.region_description=rows[0]['region_description'];
				console.log(rows);
				res.render('edit_region',data);
			});
		}
	}else{
		req.session.ref=req.url;
		res.redirect('login');
	}
}


exports.view = function(req,res){
	var regionId = req.url.split("/")[3];
	if(regionId && regionId !== ''){

			regionModel.getRegionById(regionId,function(err,rows){
				var data = new Object;
				//res.send(rows);
				data.title = "Редакция на Регион";
				data.region_name=rows[0]['region_name'];
				data.region_description=rows[0]['region_description'];
				data.id =  rows[0]['_id'];
				if(req.session.username){
					data.loged  = true;
				}else{
					data.loged = false;
				}
				
				res.render('view_region',data);
			});
		}else{

		}
}

exports.editor = function(req,res){
	var regionId = req.url.split("/")[3];
	
	var postData = req.body;
	regionModel.editRegion(regionId,postData,function(err,rows){
		if(rows === 1){
			res.redirect('/regions/view/'+regionId);
		}
	});
}

exports.delete = function(req,res){
	var regionId = req.url.split("/")[3];
	regionModel.delete(regionId,function(err,rows){
		if(rows === 1){
			res.redirect('/regions');
		}
	})
}