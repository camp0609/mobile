import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from 'react-native-elements';
// import { connect } from 'react-redux';
import { createUser } from '../actions/authActions';
import { useStoreActions, useStoreState } from 'easy-peasy';

const signUp = (props) => {
	const [email, setEmail] = useState('');
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	// const { signIn, otherFunction } = useActions(actions => {	//syntax for using multiple actions in a component
	// 	signIn: actions.signIn,							
	// 	otherFunction: actions.otherFunction
	// });
	let authErrMsg = useStoreState(state => state.authErrMsg);
	const register = useStoreActions(actions => actions.register);
	return (
		<React.Fragment>
			<Text h3> Sign Up </Text>
			<Input placeholder = "Email" onChangeText = {setEmail}/>
			<Input placeholder = "UserName" onChangeText = {setUserName}/>
			<Input secureTextEntry = {true} placeholder = "Password" onChangeText = {setPassword}/>
			<Button title = "SignIn"
			onPress = {() => props.navigation.navigate('signIn')}/>
			<Button title = "SignUp"
			onPress = { () => {
				let userData = {
					username: userName,
					email: email,
					password: password
				};
				register(userData);
			} }/>
			{authErrMsg ? <Text style = {styles.errorMsg}>{authErrMsg}</Text> : null}
		</React.Fragment>
		);
		
};

const styles = StyleSheet.create({
	errorMsg: {
		fontSize: 16,
		color: 'red'
	}
});

export default signUp;

// export default connect(null, { createUser })(signUp);