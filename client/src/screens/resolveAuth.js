import React, { useEffect } from 'react';
import { useStoreActions } from 'easy-peasy';

const resolveAuth = () => {
	const localLogin = useStoreActions(actions => actions.localLogin);//autoLogin if user token is saved 

	useEffect(() => {	// useEffect with empty array allows you to call function once on component created
		localLogin();
	}, [])

	return null;//show nothing on screen while it runs localLogin
}

export default resolveAuth;