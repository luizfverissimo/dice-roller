import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";

const NewRollScreen = (props) => {
  return (
    <View>
      <Text>NewRollsScreen</Text>
    </View>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: "Adicionar/Editar Rolagem",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Adicionar Rolagem"
            iconName={"content-save"}
            onPress={() => {}}
          />
        </HeaderButtons>
      );
    },
  };
};

export default NewRollScreen

const styles = StyleSheet.create({})
