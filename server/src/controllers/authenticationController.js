const { db } = require("../config/db.js");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const bcrypt = require('bcrypt');
const saltRounds = 10;

function jwtSignUser(user) {
	const oneWeek = 60 * 60 * 24 * 7
	return jwt.sign(user, config.authentication.jwtSecret, {
		expiresIn: oneWeek
	});
}

module.exports = {
	async register(req, res) {
		try {
			console.log('working');
			console.log(req.body.password);
			bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
				console.log(hash);
  				db.query(/* eslint-disable */
					"INSERT INTO users(username, email, password) VALUES(?, ?, ?)",
					[req.body.username, req.body.email, hash], 
					(err, results, fields) => {
						if (!err) {
							console.log(results.insertId);
							let plainUser = {id: results.insertId, username: req.body.username, email: req.body.email}; // can only use plain object in jwt param
							// let userJson = JSON.stringify(results);
							res.send({
								user: plainUser,
								token: jwtSignUser(plainUser)
							});
						} else {
							console.log(err);
						}
					}
				);
			});
		} catch (err) {
			res.status(500).send({
				error: "An error has occured while trying to sign up"
			});
		}
	},

	async login(req, res) {
		try {
			db.query(
				"SELECT * FROM users WHERE username = ?",
				[req.body.username, req.body.password],
				(err, results, fields) => {
					if (err) {
						res.status(err).send({
							error: "An error occurred trying to login"
						});
					} else if (results != null) {
						let match = bcrypt.compare(req.body.password, results[0].password);
						if (match) {
							let plainUser = {id: results[0].id, username: results[0].username, email: results[0].email}; // can only use plain object in jwt param
							let userJson = JSON.stringify(results); 
							console.log(results);
							res.send({
								user: userJson,
								token: jwtSignUser(plainUser)
							});
						} else {
							res.status(403).send({
								//incorrect password
								error: "Login information was incorrect"
								// match
							});
						}
					} else {
						res.status(403).send({
							//incorrect username
							error: "Login information was incorrect, no account found with username"
						});
					}
				}
			);
		} catch (err) {
			res.status(500).send({
				error: "An error occured trying to login"
			});
		}
	}
};