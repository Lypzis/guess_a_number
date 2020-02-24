import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableNativeFeedback,
  Platform,
  TouchableOpacity
} from "react-native";

import Colors from "../constants/colors";

const MainButton = props => {
  let ButtonComponent = TouchableOpacity;

  if (Platform.Version >= 21) ButtonComponent = TouchableNativeFeedback;

  return (
    <View style={styles.buttonContainer}>
      <ButtonComponent activeOpacity={0.8} onPress={props.onPress}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{props.children}</Text>
        </View>
      </ButtonComponent>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: Colors.primary,
    borderRadius: 25
  },
  buttonText: {
    color: "#fff",
    fontFamily: "open-sans",
    fontSize: 18
  },
  buttonContainer: {
    borderRadius: 25,
    overflow: "hidden" // will hide anything that goes beyond the boudaries of, in this case, the button
  }
});

export default MainButton;
