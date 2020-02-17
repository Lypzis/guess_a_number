import React from "react";
import { StyleSheet, View } from "react-native";

// only goal of this container is to apply a "border" to something,
// to look like a card, merged with custom styles from outside
const Card = props => (
	<View style={{ ...styles.card, ...props.style }}>{props.children}</View>
);

const styles = StyleSheet.create({
	card: {
		// IMPORTANT OBS: These shadows only works on iOS
		shadowColor: "#000", // case rgba(0,0,0,0) opacity will not influence here tough
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		shadowOpacity: 0.26,

		// IMPORTANT OBS: This shadow only works on Android
		elevation: 5,

		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 5
	}
});

export default Card;
