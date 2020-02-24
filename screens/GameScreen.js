import React, { useState, useRef, useEffect } from "react"; // useRef survives re-render as the same object and values, which is what it is
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// only works on expo
import { ScreenOrientation } from "expo";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import Colors from "../constants/colors";

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  // recursion in case of exclusion
  if (rndNum === exclude) return generateRandomBetween(min, max, exclude);
  else return rndNum;
};

const GameScreen = props => {
  // just an example of the api offered by expo, locks screen into portrait mode, once this screen is reached
  //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomBetween(1, 100, props.userChoice);

  // them both receives the initalGuess as first parameter
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
    Dimensions.get("window").height
  );

  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (availableDeviceHeight < 500) {
    }

    const updateLayout = () =>
      setAvailableDeviceHeight(Dimensions.get("window").height);

    Dimensions.addEventListener("change", updateLayout);

    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  // will execute after every render cycle
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
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
      currentLow.current = currentGuess + 1;
    }

    // next generated number will be between the new boundaries set,
    // excluding the current guess(no reason to try the same number again duh :D )
    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    /* to append elements to the start of the array, or pastGuesses.length  index
		// first option does look better tough
		const tempArr = [...currPastGuesses];
		tempArr.push(nextNumber); */

    setCurrentGuess(nextNumber);
    setPastGuesses(currPastGuesses => [nextNumber, ...currPastGuesses]);
  };

  const renderListItem = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
      <BodyText style={styles.text}>#{numOfRound}</BodyText>
      <BodyText style={styles.text}>{value}</BodyText>
    </View>
  );

  if (availableDeviceHeight < 500) {
    return (
      <View style={styles.screen}>
        <Text>Opponent's Guess:</Text>
        <View style={styles.controls}>
          <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="#fff" />{" "}
          </MainButton>
          <NumberContainer>{currentGuess}</NumberContainer>

          <MainButton onPress={nextGuessHandler.bind(this, "higher")}>
            <Ionicons name="md-add" size={24} color="#fff" />
          </MainButton>
        </View>
        <View
          style={
            Dimensions.get("window").width > 350
              ? styles.listContainer
              : styles.listContainerBig
          }
        >
          <ScrollView contentContainerStyle={styles.list}>
            {/** 'contentContainerStyle' for styling 'Scrollview' and 'flatlist', check docs */}
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  } else {
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
        <View
          style={
            Dimensions.get("window").width > 350
              ? styles.listContainer
              : styles.listContainerBig
          }
        >
          <ScrollView contentContainerStyle={styles.list}>
            {/** 'contentContainerStyle' for styling 'Scrollview' and 'flatlist', check docs */}
            {pastGuesses.map((guess, index) =>
              renderListItem(guess, pastGuesses.length - index)
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
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
    marginTop: Dimensions.get("window").height > 600 ? 20 : 7, // if window height is bigger than 600, use 20 as margin else 10
    marginBottom: 5,
    width: 300,
    maxWidth: "90%"
  },
  listContainer: {
    flex: 1, // this is extremelly necessary for android, or the scrollview won't work"
    width: "75%"
  },
  //example
  listContainerBig: {
    flex: 1,
    width: "95%"
  },
  list: {
    flexGrow: 1, // takes all available space and as it grows, it takes more space, using just 'flex' will brake the 'scroll'
    alignItems: "center",
    justifyContent: "flex-end"
  },
  listItem: {
    flexDirection: "row",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 3,
    padding: 15,
    marginVertical: 5,
    backgroundColor: "#fff",
    justifyContent:
      Dimensions.get("window").width < 350 ? "space-between" : "space-around",
    //width: "60%",
    width: Dimensions.get("window").width > 350 ? "60%" : "95%",

    elevation: 2
  },
  text: {
    color: Colors.secondary,
    fontSize: 16
  },
  controls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "45%"
  }
});

export default GameScreen;
