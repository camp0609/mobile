import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Input, Button } from 'react-native-elements';
import { useStoreActions, useStoreState } from 'easy-peasy';



const frontPage = () => {
	const logout = useStoreActions(actions => actions.logout);
	return (
		<React.Fragment>
			<Button title = "Logout"
			onPress = {() => console.log('logout')}/>
		</React.Fragment>
		);
		
};

const styles = StyleSheet.create({});

export default frontPage;
