import {FETCH_POSTS, NEW_POST} from '../actions/types';

const initialState = {
	loggedIn: false,
}

export default function(state = initialState, action) {
	switch(action.type) {
		case FETCH_POSTS:
			return {
				...state,
				items: actions.payload
			}; 
		case NEW_POST:
			return {
				...state,
				item: actions.payload
			};
		default:
			return state;
	}
}