import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	Button,
	Alert,

	// usability purposes
	TouchableWithoutFeedback,
	Keyboard,

	// Responsivity purposes
	Dimensions,
	ScrollView,
	KeyboardAvoidingView
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberComponent from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState(0);
	const [buttonWidth, setButtonWidth] = useState(
		Dimensions.get("window").width / 4
	);

	useEffect(() => {
		// redimension buttonss
		const updateLayout = () => {
			Dimensions.get("window").width < 500
				? setButtonWidth(Dimensions.get("window").width / 3)
				: setButtonWidth(Dimensions.get("window").width / 4);
		};
		// Listens to layout changes(landscape/portrait), to execute its function
		Dimensions.addEventListener("change", updateLayout);

		// cleanup function, runs right before useEffect runs
		// This avoids creation of multiple listeners to the same thing whenever state updates
		return () => Dimensions.removeEventListener("change", updateLayout);
	});

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, "")); // this regex replaces any non number value for ''(an empty string)
	};

	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};

	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);

		// If somehow the number is not still valid, just exits the function
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert(
				"Invalid number!",
				"Number has to be a number between 1 and 99!",
				[{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
			);
			return;
		}

		setConfirmed(true);
		setEnteredValue(""); // there is no problem in pássing this before the next line
		// they're all batched together
		setSelectedNumber(parseInt(chosenNumber));
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed)
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You Selected: </Text>
				<NumberComponent>{selectedNumber}</NumberComponent>
				<MainButton onPress={() => props.onStartGame(selectedNumber)}>
					Start Game!
				</MainButton>
			</Card>
		);

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss(); // when anywhere outside of the screen of the app is tapped, closes keyboard;
					}}
				>
					<View style={styles.screen}>
						<Text style={styles.title}>Start a New Game!</Text>
						<Card style={styles.inputContainer}>
							<BodyText>Select a Number</BodyText>
							<Input
								blurOnSubmit
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="numeric"
								maxLength={2}
								onChangeText={numberInputHandler}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ ...styles.button, width: buttonWidth }}>
									<Button
										title="Reset"
										color={Colors.secondary}
										onPress={resetInputHandler}
									/>
								</View>
								<View style={{ ...styles.button, width: buttonWidth }}>
									<Button
										title="Confirm"
										color={Colors.primary}
										onPress={confirmInputHandler}
									/>
								</View>
							</View>
						</Card>
						{confirmedOutput}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

// only runs once, so things in here
// won't respond to state changes
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	title: {
		fontSize: 20,
		marginVertical: 10, // replaces marginbotton and margintop
		fontFamily: "open-sans-bold"
	},
	inputContainer: {
		width: "80%", //default
		maxWidth: "95%", // ensures that the width will never touches or reach outside of the screen
		minWidth: 300, // or this, for really small devices
		alignItems: "center"
	},
	buttonContainer: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		paddingHorizontal: 15 // padding to left and right
	},
	button: {
		//width: "47%" or
		// Dimensions always get the measures of the screen
		width:
			Dimensions.get("window").width < 500
				? Dimensions.get("window").width / 3
				: Dimensions.get("window").width / 4 // Note: use always window, for it works in both ios and android
	},
	summaryContainer: {
		marginTop: 20,
		alignItems: "center"
	},
	text: {
		fontFamily: "open-sans" // downside, this can only be added direct to 'texts'
	}
});

export default StartGameScreen;
