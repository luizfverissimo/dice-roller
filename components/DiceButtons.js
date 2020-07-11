import React from 'react'
import { StyleSheet, View, TouchableNativeFeedback } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'

import Colors from '../constants/colors'

const DiceButtons = (props) => {
  return (
    <View style={{ ...styles.rollButton, ...props.style }}>
    <TouchableNativeFeedback onPress={props.onPress} >
      <View style={styles.button} >
        <MaterialCommunityIcons name={props.icon} size={42} color="white" />
      </View>
    </TouchableNativeFeedback>
    </View>
  )
}

export default DiceButtons

const styles = StyleSheet.create({
  rollButton: {
    backgroundColor: Colors.primary,
    height: 60,
    width: 60,
    borderRadius: 10,    
    elevation: 5,
    overflow: 'hidden'
  },
  button:{
    height: 60,
    width: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
})
