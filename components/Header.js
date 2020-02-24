import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";

import Colors from "../constants/colors";
import TitleText from "../components/TitleText";

const Header = props => {
  return (
    <View
      style={
        // merge
        {
          ...styles.headerBase,
          ...Platform.select({
            ios: styles.headerIOS,
            android: styles.headerAndroid
          })
        }
        // or
        /* 
        Platform.OS === "android"
          ? [styles.headerBase, styles.headerAndroid]
          : [styles.headerBase, styles.headerIOS]*/
      }
    >
      <TitleText
        style={
          Platform.OS === "android" ? styles.headerTitle : styles.headerTitle2
        }
      >
        {props.title}
      </TitleText>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBase: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  headerIOS: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    backgroundColor: "#fff"
  },
  headerAndroid: {
    backgroundColor: Colors.primary
  },
  headerTitle: {
    color: "#fff"
  },
  headerTitle2: {
    color: Colors.primary
  }
});

export default Header;
