import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Input, Button } from "react-native-elements";
import { useStore } from "easy-peasy";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import {
	FontAwesome,
	Ionicons,
	MaterialCommunityIcons
} from "@expo/vector-icons";
import * as Location from "expo-location";
import { useStoreActions, useStoreState } from 'easy-peasy';

const camera = () => {
	// const userToken = useStore(state => state.userToken); // let var = useStore(state => state.pieceOfState);  syntax to grab state
	const [hasPermission, setHasPermission] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);
	const [error, setError] = useState(null);
	const [locPermission, setLocPermission] = useState(null);
	const [photo64, setPhoto64] = useState(null);//base64 for image
	const [coords, setCoords] = useState(null);
	const picTaken = useStoreActions(actions => actions.picTaken);

	useEffect(() => {
		//maybe move this to the very first
		(async () => {
			const { status } = await Permissions.askAsync(Permissions.CAMERA);
			if (status !== "granted") {
				setError(err);
			}else {
				setHasPermission(status === "granted");
			}
		})();
	}, []);

	useEffect(() => {
		(async () => {
			let { status } = await Permissions.askAsync(Permissions.LOCATION);
			if (status !== "granted") {
				setError(err);
			}else {
				setLocPermission(status === "granted");
			}
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	//https://reactnativemaster.com/react-native-camera-expo-example/

	takePicture = async () => {
		if (this.camera) {
			let photo = await this.camera.takePictureAsync({ base64: true });
			let location = await Location.getCurrentPositionAsync({});
			let payload = {photo: photo, location: location};
			// console.log(photo.uri);
			// setCoords(location);
			// console.log(location);
			picTaken(payload);
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Camera
				style={{ flex: 1 }}
				type={type}
				ref={ref => {
					this.camera = ref;
				}}
			>
				<View
					style={{
						flex: 1,
						backgroundColor: "transparent",
						flexDirection: "row",
						justifyContent: "space-between",
						margin: 20
					}}
				>
					<TouchableOpacity
						style={{
							alignSelf: "flex-end",
							alignItems: "center",
							backgroundColor: "transparent"
						}}
						onPress={() => {
							takePicture();
						}}
					>
						<Ionicons
							name="ios-photos"
							style={{ color: "#fff", fontSize: 40 }}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							flex: 0.1,
							alignSelf: "flex-end",
							alignItems: "center"
						}}
						onPress={() => {
							setType(
								type === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					>
						<Text
							style={{
								fontSize: 18,
								marginBottom: 10,
								color: "white"
							}}
						>
							{" "}
							Flip{" "}
						</Text>
					</TouchableOpacity>
				</View>
			</Camera>
		</View>
	);
};

const styles = StyleSheet.create({});

export default camera;
