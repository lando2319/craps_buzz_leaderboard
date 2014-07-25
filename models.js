var host_creds = require('./host_creds')
module.exports = function(){
	var obj = {};
	var mysql      = require('mysql');
	var connection;

	// Init mysql connection
	obj.connectMysql = function(name){
		connection = mysql.createConnection({
		  host     : host_creds.host,
		  user     : host_creds.user,
		  password : host_creds.password,
		  database: host_creds.database
		});
	}

	obj.enterLeaderboard = function(name, cashout_amount, cb){
		var newUser  = {
			name: name,
			cashout_amount: cashout_amount,
		};
		var query = connection.query('INSERT INTO leaders SET ?', newUser, function(err, result) {
		  cb(err, result)
		});	
	}

	obj.userList = function(cb){
		connection.query('select * from leaders ORDER BY cashout_amount desc, id limit 10', function(err, result) {
		  cb(err, result)
		});	
	}

	// connect to mysql
	obj.connectMysql();

	// Return all the functions
	return obj;
}
