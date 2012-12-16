var mysql = require('mysql');
var db = mysql.createConnection({
	host:'mysql9.000webhost.com',
	user:'a3458850_wine',
	password:'Emo05051981',
	database:'a3458850_wine'
});





exports.getUserByUsername = function(username,callback){
     
	 db.query("SELECT * from users where username = '"+username+"'",function(err,rows){
	 	callback(err,rows);	
	 });

}
