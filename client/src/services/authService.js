import Api from "./api";

export default {
	register(credentials) {
		// credentials are the inputs from the signUp form
		return Api().post("register", userData); // pointing to the register endpoint (insert user info into db)
	},

	login(credentials) {
		return Api().post("login", credentials);
	}
};