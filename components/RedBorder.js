import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Colors from '../constants/colors'

const RedBorder = (props) => {
  return (
    <View style={{...styles.redBorder, ...props.style}} >
      {props.children}
    </View>
  )
}

export default RedBorder

const styles = StyleSheet.create({
  redBorder: {
    borderColor: Colors.primary,
    borderWidth: 1
  }
})
