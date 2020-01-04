/* eslint-disable */ 
const mysql = require("mysql");

const db = mysql.createConnection({
	host: "10.0.0.31",
	user: "root",
	database: "gpsdb"
});

db.connect((err) => {
	if(err){
		throw(err);
		console.log(err);
	}
	console.log('connected to db');
});

module.exports = {db}; 

//https://github.com/mysqljs/mysql