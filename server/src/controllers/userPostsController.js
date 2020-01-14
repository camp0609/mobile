//need to adjust error messages
const { db } = require("../config/db.js");
const fs = require('fs')

module.exports = {
	async savePost(req, res) {
		try {
			let date = new Date();
			console.log(date);
			let timeStamp = Date.now() / 1000 | 0; //timeStamp without milliseconds
			console.log(timeStamp);
			console.log([req.body.userId, req.body.longitude, req.body.latitude, req.body.message]);
			db.query("INSERT INTO posts(userId, longitude, latitude, message, date) VALUES(?, ?, ?, ?, ?)",
				[req.body.userId, req.body.longitude, req.body.latitude, req.body.message, date],
				(err, results, fields) => {
					if(!err) {
						let postId = results.insertId;
						let originalBase64 = req.body.base64;
						let data = originalBase64.replace(/^data:image\/png;base64,/, "");
						let buffer = Buffer.from(data, "base64");
						fs.writeFile('./images/image' + postId + '.png', buffer, (err, results) => { //not sure if need to actually create the images dir in this chunck of code?
							if(err) {
								console.log(err);
							}
						});
						res.send('it worked');
						console.log('file was saved');
					} else {
						console.log(err);
					}
				});
		} catch (err) {
			res.status(300).send({
				error: "An error saving your post"
			});
		}
	},

	async getPosts(req, res) {
		try {
			console.log(req.params.userId);
			db.query("SELECT * FROM posts WHERE userId = ?", //will need to figure out how many posts to return intially, prob by most recent
				[req.params.userId],
				(err, results, fields) => {
					if(!err) {
						console.log(results);
						res.send(results);
					} else {
						console.log(err);
					}
				});
		} catch(err) {
			console.log('something went wrong getting user posts')
		}
	}

};
