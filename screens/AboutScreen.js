import React from "react";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BoldText from "../components/BoldText";
import DefaultText from "../components/DefaultText";

import Colors from "../constants/colors";

const AboutScreen = (props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <BoldText>Versão</BoldText>
        <DefaultText>0.1.1</DefaultText>
      </View>
      <View style={styles.textContainer}>
        <BoldText>Autor</BoldText>
        <DefaultText>luizfverissimo</DefaultText>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://github.com/luizfverissimo')} >
          <MaterialCommunityIcons name="github-box" size={52} color="black" />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <MaterialCommunityIcons name="linkedin-box" size={52} color="black" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

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

export default AboutScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    margin: 10,
  },
  textContainer: {
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 5
  },
});
