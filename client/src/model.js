import { action, thunk } from 'easy-peasy';
import { AsyncStorage } from 'react-native';
import api from './services/api';
import { navigate } from './navigationRef';
export default {
	userToken: {},

	authErrMsg: '',

	//thunks
	register: thunk(async (actions, payload) => {
		console.log(payload);
		try {
			const res = await api().post('register', payload);
			console.log(res.data.user);
			actions.signIn(res.data.token);
			await AsyncStorage.setItem('token', res.data.token);
			navigate('frontPage');
		}catch(err) {
			const errType = 1; //will need to come back and fix error status stuff
			actions.authError(errType);
		}
	}),

	login: thunk(async (actions, payload) => {
		try {
			const res = await api().post('login', payload);
			console.log(res.data.user);
			await AsyncStorage.setItem('token', res.data.token);
			actions.signIn(res.data.token);
		}catch(err) {
			const errType = 0;
			actions.authError(errType);
		}
	}),

	localLogin: thunk(async actions => { //see if token save from user recently signed in
		const token = await AsyncStorage.getItem('token');
		if(token) {
			actions.signIn(token);
		}else {
			navigate('signIn');
		}
	}),

	deleteToken: thunk(async actions => {
		await AsyncStorage.removeItem('token');
	}),

	//Actions
	signIn: action((state, token) => {
		state.userToken = token;
		navigate('frontPage');
	}),

	signOut: action(state => {
		state.userToken = null;
		state.authErrMsg = '';
		navigate('signIn');
	}),

	authError: action((state, errType) => { //1 err message for now, for both signup and signin
		if(errType == 1) {
			state.authErrMsg = "There is an issue signing up right now"
		} else {
			state.authErrMsg = "invalid password/email";
		}
	})
}
