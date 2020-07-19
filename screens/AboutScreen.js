import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";

const AboutScreen = (props) => {
  return (
    <View>
      <Text>About Screen</Text>
    </View>
  )
}

export const screenOptions = (navData) => {
  return {
    headerTitle: "Sobre",
    headerLeft: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={"menu"}
            onPress={() => navData.navigation.toggleDrawer()}
          />
        </HeaderButtons>
      );
    },
  };
};

export default AboutScreen

const styles = StyleSheet.create({})
