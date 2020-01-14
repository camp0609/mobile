import { action, thunk } from 'easy-peasy';
import { AsyncStorage } from 'react-native';
import api from './services/api';
import { navigate } from './navigationRef';
export default {
	userToken: {},

	authErrMsg: '',

	userId: {},

	picture: {},

	location: {},

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
			console.log(res.data);
			await AsyncStorage.setItem('token', res.data.token);
			actions.signIn(res.data);
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
		actions.signOut();
	}),

	savePost: thunk(async (actions, payload) => {
		try {
			console.log(payload);
			const res = await api().post('savePost', payload);
			actions.picTaken();
		}catch(err) {
			console.log(err);
		}
	}),

	//Actions
	signIn: action((state, payload) => {
		state.userToken = payload.token;
		state.userId = payload.userId;
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
	}),

	picTaken: action((state, payload) => {
		state.location = payload.location;
		state.picture = payload.picture;
		navigate('picture'); //need to figure out where to navigate after pic taken
	})
}

// <Image
// 	          style={{width: 50, height: 50}}
// 	          source={{uri: picture.uri}}
// 	        />
// 	         <Text>{location}</Text>
// 	         <Input placeholder = "Save message with image" onChangeText = {setMessage}/>
