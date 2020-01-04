/* eslint-disable */
const authenticationController = require("./controllers/authenticationController");
const signUpAuthentication = require("./authentication/signUpAuthentication");
// const userPostsController = require("./controllers/userPostsController");
// const likesController = require("./controllers/likesController");
// const commentsController =require("./controllers/commentsController");
// const searchController = require("./controllers/searchController");

module.exports = app => {
	app.post("/register",
		signUpAuthentication.register,
		authenticationController.register);	
};