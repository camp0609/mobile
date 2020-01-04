/* eslint-disable */

const joi = require("joi");

module.exports = {
	register(req, res, next) {
		console.log('its hitting the backend');
		console.log(req.body);
		const schema = {
			username: joi.string(), // need to decide what params to use for usernames ???
			email: joi.string().email(),
			password: joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,32}$"))
		};

		const { error, value } = joi.validate(req.body, schema);

		if (error) {
			switch (error.details[0].context.key) {
				case "username":
					console.log('there is an error with username');
					res.status(400).send({
						error: "Check username rules"
					});
					break;
				case "email":
					console.log('there is an error with email');
					res.status(400).send({
						error: "Please provide valid email"
					});
					break;
				case "password":
					console.log('there is an error with password');
					res.status(400).send({
						error: "Check password rules"
					});
					break;
				default:
					console.log(error);
					res.status(400).send({
						error: "Invalid registration information"
					});
			}
		} else {
			next();
		}
	}
};