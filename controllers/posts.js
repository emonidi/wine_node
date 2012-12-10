var postModel = require('../models/post.js');


function index (req){
	var posts  = postModel.getAllPosts();

	req.write("<h1>This is index function from posts controller</h1>");

	posts.forEach(function(value){
		req.write("<br /><strong>"+value.title+"</strong><p>"+value.content+"</p>");
	});
}

exports.index = index;