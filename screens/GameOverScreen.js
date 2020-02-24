import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ScrollView
} from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/colors";
import MainButton from "../components/MainButton";

//import succesImage from "../assets/success.png"; or this

const GameOverScreen = props => {
  const [deviceAvailableWidth, setDeviceAvailableWidth] = useState(
    Dimensions.get("window").width
  );

  useEffect(() => {
    const updateLayout = () =>
      setDeviceAvailableWidth(Dimensions.get("window").width);

    Dimensions.addEventListener("change", updateLayout);

    return () => Dimensions.removeEventListener("change", updateLayout);
  });

  return (
    <ScrollView>
      <View style={styles.screen}>
        <TitleText>The Game is Over!</TitleText>
        <View
          style={
            deviceAvailableWidth > 500
              ? [styles.imageBox, styles.imageBorder]
              : [styles.imageBoxPortrait, styles.imageBorder]
          }
        >
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
            <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
            guess the number{" "}
            <Text style={styles.highlight}>{props.userNumber}</Text>!
          </BodyText>
        </View>

        <MainButton onPress={props.onRestart}>NEW GAME</MainButton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15
  },
  image: {
    width: "100%",
    height: "100%"
  },
  imageBox: {
    width: Dimensions.get("window").width * 0.7, //300,
    height: Dimensions.get("window").width * 0.7,
    borderRadius: (Dimensions.get("window").width * 0.7) / 2, // to get a perfect circle, it needs to be a square and the value here must be half
    marginVertical: Dimensions.get("window").height / 30 // effectively sets to 5%, as 40 to 2.5%
  },
  imageBoxPortrait: {
    width: 300,
    height: 300,
    borderRadius: 150, // to get a perfect circle, it needs to be a square and the value here must be half
    marginVertical: 15 // effectively sets to 5%, as 40 to 2.5%
  },
  imageBorder: {
    borderWidth: 5,
    borderColor: "#000",
    overflow: "hidden"
  },
  highlight: {
    color: Colors.primary
  },
  textBox: {
    width: "75%",
    marginVertical: Dimensions.get("window").height / 60
  },
  text: {
    fontFamily: "open-sans-bold",
    textAlign: "center",
    fontSize: Dimensions.get("window").height < 400 ? 16 : 20
  }
});

export default GameOverScreen;
