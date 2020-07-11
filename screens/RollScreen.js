import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../components/HeaderButton";
import RollButton from "../components/RollButton";
import Card from "../components/Card";
import BoldText from "../components/BoldText";
import DefaultText from "../components/DefaultText";

import Colors from "../constants/colors";

const RollScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text>RollScreen</Text>
      </Card>
      <RollButton style={styles.rollButton} />
      <View style={styles.textContainer} >
        <BoldText style={styles.textBold} >Histórico</BoldText>
      </View>
    </View>
  );
};

export default RollScreen;

export const screenOptions = (navData) => {
  return {
    headerTitle: "Rolagens",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Rolagens Salvas"
            iconName={"dice-multiple"}
            onPress={() => navData.navigation.navigate("SavedRoll")}
          />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  card: {
    width: "90%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  rollButton: {
    position: "absolute",
    bottom: 25,
  },
  textContainer: {
    marginVertical: 20,
  },
  textBold: {
    color: Colors.primary
  }
});
