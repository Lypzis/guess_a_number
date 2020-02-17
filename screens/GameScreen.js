import React, { useState, useRef, useEffect } from "react"; // useRef survives re-render as the same object and values, which is what it is
import { View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;

	// recursion in case of exclusion
	if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
	else return rndNum;
};

const GameScreen = props => {
	const [currentGuess, setCurrentGuess] = useState(
		generateRandomBetween(1, 100, props.userChoice)
	);
	const [rounds, setRounds] = useState(0);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	// will execute after every render cycle
	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(rounds);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuess < userChoice) ||
			(direction === "higher" && currentGuess > userChoice)
		) {
			Alert.alert("Don't lie!", "You know that this is wrong...", [
				{ text: "Sorry!", style: "cancel" }
			]);
			return;
		}

		// next time, number can't be higher than the current guess
		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			// or can't be lower in this case
			currentLow.current = currentGuess;
		}

		// next generated number will be between the new boundaries set,
		// excluding the current guess(no reason to try the same number again duh :D )
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		setRounds(currRound => ++currRound);
	};

	return (
		<View style={styles.screen}>
			<Text>Opponent's Guess:</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton onPress={nextGuessHandler.bind(this, "lower")}>
					<Ionicons name="md-remove" size={24} color="#fff" />{" "}
				</MainButton>
				<MainButton onPress={nextGuessHandler.bind(this, "higher")}>
					<Ionicons name="md-add" size={24} color="#fff" />
				</MainButton>
			</Card>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center"
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 20,
		width: 300,
		maxWidth: "90%"
	}
});

export default GameScreen;
