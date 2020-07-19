import React from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as configActions from "../store/config-actions";
import {MaterialCommunityIcons} from '@expo/vector-icons'

import Colors from '../constants/colors'

const SoundSwitch = (props) => {
  const soundState = useSelector((state) => state.config.state);
  const dispatch = useDispatch();

  
  return (
    <View style={styles.switchContainer}>
      <MaterialCommunityIcons name="volume-mute" size={24} color="#7b7b7c" />
      <Switch
        value={soundState}
        trackColor={{true: Colors.primaryColorSwitch }}
        thumbColor={Colors.primary}
        onValueChange={(newValue) => dispatch(configActions.setSound(newValue))}
      />
      <MaterialCommunityIcons name="volume-high" size={24} color="#7b7b7c" />
    </View>
  );
};

export default SoundSwitch;

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  textContainer: {
    marginRight: 5
  },
  text: {
    color: "#7b7b7c",
  },
});
