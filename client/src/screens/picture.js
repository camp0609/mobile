import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from 'react-native-elements';
import { useStoreActions, useStoreState } from 'easy-peasy';

const picture = () => {
	const [message, setMessage] = useState('');
	// let picture = useStoreState(state => state.picture);
	// let location = useStoreState(state => state.location);
	const savePost = useStoreActions(actions => actions.savePost);
	// const userId = useStoreState(state => state.userId);
	// let coords = {lat: location.coords.latitude, lng: location.coords.longitude}

	return (
		<React.Fragment>
			<Image
	          style={{width: 50, height: 50}}
	          source={{uri: picture.uri}}
	        />
	         <Text>{location.coords}</Text>
	         <Input placeholder = "Save message with image" onChangeText = {setMessage}/>
	        <Button title = 'Submit' onPress = {() =>{
	        	let payload = {
	        		coords,
	        		base64: picture.base64,
	        		message
	        	}
	        	console.log(picture);
	        	console.log(location);
	        }}/>
		</React.Fragment>
	);
}

export default picture;