import React from "react";
import {
	View,
	StyleSheet,
	Button,
	Image,
	Text,
	ColorPropType
} from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

//import succesImage from "../assets/success.png"; or this

const GameOverScreen = props => {
	return (
		<View style={styles.screen}>
			<TitleText>The Game is Over!</TitleText>
			<View style={styles.imageBox}>
				<Image
					fadeDuration={1000} // a nice fade effect for images loaded from outside
					source={require("../assets/success.png")}
					// from web
					//source={{uri: '--your link here--'}}
					style={styles.image}
					resizeMode="cover" // cool :D, except my relations, which are null
				/>
			</View>
			<View style={styles.textBox}>
				<BodyText style={styles.text}>
					{/** IMPORTANT NOTE: Texts inherit styles */}
					Your phone needed{" "}
					<Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess
					the number <Text style={styles.highlight}>{props.userNumber}</Text>!
				</BodyText>
			</View>

			<MainButton onPress={props.onRestart}>NEW GAME</MainButton>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	image: {
		width: "100%",
		height: "100%"
	},
	imageBox: {
		width: 300,
		height: 300,
		borderRadius: 150, // to get a perfect circle, it needs to be a square and the value here must be half
		borderWidth: 5,
		borderColor: "#000",
		overflow: "hidden",
		marginVertical: 30,

		elevation: 5 //android only
	},
	highlight: {
		color: Colors.primary
	},
	textBox: {
		width: "75%",
		marginVertical: 15
	},
	text: {
		fontFamily: "open-sans-bold",
		textAlign: "center",
		fontSize: 20
	}
});

export default GameOverScreen;
