import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";

import Colors from "../constants/colors";
import BoldText from "../components/BoldText";

const RollModalButton = (props) => {
  return (
    <View style={{ ...styles.rollButton, ...props.style }}>
      <TouchableNativeFeedback onPress={props.onPress}>
        <View style={styles.button} >
        <BoldText style={styles.text}>ROLAR!</BoldText>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default RollModalButton;

const styles = StyleSheet.create({
  rollButton: {
    backgroundColor: Colors.primary,
    height: 60,
    width: "80%",
    borderRadius: 10,
    elevation: 5,
    overflow: "hidden",
    
  },
  button: {
    height: 60,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
  },
});
