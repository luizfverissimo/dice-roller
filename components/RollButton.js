import React from "react";
import { StyleSheet, View, TouchableNativeFeedback } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import Colors from "../constants/colors";

const RollButton = (props) => {
  

  return (
    <View style={{ ...styles.rollButton, ...props.style }}>
    <TouchableNativeFeedback onPress={props.onPress} >
      <View style={styles.button} >
        <FontAwesome5 name="dice-d20" size={40} color="white" />
      </View>
    </TouchableNativeFeedback>
    </View>
  );
};

export default RollButton;

const styles = StyleSheet.create({
  rollButton: {
    backgroundColor: Colors.primary,
    height: 80,
    width: 80,
    borderRadius: 40,    
    elevation: 5,
    overflow: 'hidden'
  },
  button:{
    height: 80,
    width: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
