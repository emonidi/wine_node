
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req,res){
	
	var qs = require('querystring');
	var userModel = require('../models/user');
	var username = req.body.username;
	var pass = req.body.password;
	userModel.getUserByUsername(username,function(err,rows){
		
		if(rows[0]['username'] == username){

			req.session.username = username;
			res.redirect(req.session.ref);
			
		}else{
			req.session = {}
		}
	});
  	return req;
	
	
};

exports.logout = function(req,res){
	req.session.destroy();
	res.redirect('/');
}


exports.loginView = function(req,res){
	console.log(req.session.ref);
	res.render('login');
}