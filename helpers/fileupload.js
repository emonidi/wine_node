var fs = require('fs');
exports.upload = function(file,path){
	var newPath = path;
	var image = file;
	fs.readFile(file.path,function(err,data){
		fs.writeFile(path+"/"+file.name, data, "binary")
	});
}