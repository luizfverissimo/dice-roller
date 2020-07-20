import React from 'react'
import { StyleSheet, View, TouchableNativeFeedback, Dimensions } from 'react-native'
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
    height:  Dimensions.get('window').width < 400 ? 50 : 60,
    width:  Dimensions.get('window').width < 400 ? 50 : 60,
    borderRadius: 10,    
    elevation: 5,
    overflow: 'hidden'
  },
  button:{
    height:  Dimensions.get('window').width < 400 ? 50 : 60,
    width:  Dimensions.get('window').width < 400 ? 50 : 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
})
