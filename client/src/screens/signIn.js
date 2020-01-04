import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from 'react-native-elements';
import { useStoreActions, useStoreState } from 'easy-peasy';

const signIn = ({ navigation }) => {
	const [userName, setUserName] = useState('');
	const [password, setPassword] = useState('');
	let authErrMsg = useStoreState(state => state.authErrMsg);
	const login = useStoreActions(actions => actions.login);
	
	return (
		<React.Fragment>
			<Text>Sign In</Text>
			<Input placeholder = "UserName" onChangeText = {setUserName}/>
			<Input secureTextEntry = {true} placeholder = "Password" onChangeText = {setPassword}/>
			<Button title = "Go to SignUp"
			onPress = {() => navigation.navigate('signIn')}/>
			<Button title = "SignIn"
			onPress = {() => {
				let userData = {
					username: userName,
					password: password
				};
				login(userData); 
			}
			}/>
		</React.Fragment>
	);
};

const styles = StyleSheet.create({

});

export default signIn;