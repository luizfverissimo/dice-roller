import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import SavedRollsListItem from '../components/SavedRollsListItem'

import ROLLS from '../data/dummy-data'

import Colors from '../constants/colors'

const SavedRollsScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.listConainer} >
      <SavedRollsListItem />
      <SavedRollsListItem />
      <SavedRollsListItem />
      <SavedRollsListItem />
      </View>
    </View>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: "Rolagens Salvas",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Adicionar Rolagem"
            iconName={"plus"}
            onPress={() => navData.navigation.navigate("NewRoll")}
          />
        </HeaderButtons>
      );
    },
  };
};

export default SavedRollsScreen

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  listConainer: {
    width: '90%'
  }
})
