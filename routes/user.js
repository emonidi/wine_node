
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.login = function(req,res){
	
	var qs = require('querystring');
	var userModel = require('../models/muser');
	console.log(req.session.ref);
	var username = req.body.username;
	var pass = req.body.password;
	userModel.getUserByUsername(username,function(err,rows){
		 
		 if(rows[0].username == username){
		 	req.session.username = rows[0].username;
		 	res.redirect(req.session.ref);
		 }
	})

  	//return req;
	
	
};

exports.logout = function(req,res){
	req.session.destroy();
	res.redirect('/');
}


exports.loginView = function(req,res){
	console.log(req.session.ref);
	res.render('login');
}