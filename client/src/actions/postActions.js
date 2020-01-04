import {FETCH_POSTS, NEW_POST} from './types';
import api from '../services/api';

// export function fetchPosts() {
// 	return function(dispatch) {
// 		api().get(`getComments/${postId}`)

// 	}
// }

export function createUser(userData) {
	return (dispatch) => {
		api().post('register', userData)
		.then(console.log('working'))
		.then((response) => dispatch({ type: NEW_POSTS, payload: response.data }))
		.catch(error => console.log(error));
	}
}