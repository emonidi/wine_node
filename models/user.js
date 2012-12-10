var mysql = require('mysql');
var db = mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'',
	database:'trip'
});





exports.getUserByUsername = function(username,callback){
     
	 db.query("SELECT * from users where username = '"+username+"'",function(err,rows){
	 	callback(err,rows);	
	 });

}
