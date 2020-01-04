/* eslint-disable */
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
// const mysql = require("mysql");
const config = require('./config/config')

//create DB connection
// const db = mysql.createConnection({
// 	host: "localhost",
// 	user: "root"
// });

// db.connect((err) =>{
// 	if(err){
// 		throw err;
// 	}
// 	console.log('connected');
// });

const app = express();
app.use(morgan("combined"));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cors());

require('./routes.js')(app);

app.listen(config.port);