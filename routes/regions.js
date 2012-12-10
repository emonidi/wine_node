var regionModel = require('../models/region');
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
	
	regionModel.insertRegion(postData,function(err,rows){
		if(rows.affectedRows){
			res.redirect('/regions')
		}	
	});
}

exports.list = function(req,res){
   
	regionModel.getRegions(function(err,rows){
		if(rows){
			var data  = new Object;
			data.rows = rows
			res.render('list_regions',data);		

		}
	});
	
}

exports.edit = function(req,res){

	if(req.session.username){
			var regionId = req.url.split('/')[3];
		console.log(regionId);
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
				data.title = "Редакция на Регион";
				data.region_name=rows[0]['region_name'];
				data.region_description=rows[0]['region_description'];
				data.id =  rows[0]['id'];
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
	var regionId = req.url.split('/')[3];
	var postData = req.body;
	regionModel.editRegion(postData,regionId,function(err,rows){
		if(rows.affectedRows == 1){
			res.redirect('/regions/view/'+regionId);
		}
	});
}