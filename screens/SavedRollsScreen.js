import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

const SavedRollsScreen = (props) => {
  return (
    <View>
      <Text>SavedRollScreen</Text>
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

const styles = StyleSheet.create({})
