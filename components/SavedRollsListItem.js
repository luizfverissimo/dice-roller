import React, { useState, version } from "react";
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors from "../constants/colors";
import BoldText from "./BoldText";
import RedBorder from "../components/RedBorder";
import DefaultText from "./DefaultText";

const SavedRollsListItem = (props) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const dropDownHandler = () => {
    if (!menuOpened) {
      setMenuOpened(true);
    } else {
      setMenuOpened(false);
    }
  };

  const DropDownMenu = () => {
    return (
      <RedBorder style={styles.dropDown}>
        <View style={styles.textContainer}>
          <DefaultText>TESTE</DefaultText>
          <DefaultText>TESTE</DefaultText>
          <DefaultText>TESTE</DefaultText>
          <DefaultText>TESTE</DefaultText>
          <DefaultText>TESTE</DefaultText>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={32}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={32}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </RedBorder>
    );
  };

  return (
    <>
      <View style={{ ...styles.rollButton, ...props.style }}>
        <TouchableNativeFeedback onPress={props.onPress}>
          <View style={styles.button}>
            <BoldText style={styles.text}>Título</BoldText>
            <TouchableOpacity onPress={dropDownHandler}>
              <MaterialCommunityIcons
                name="menu-down"
                size={34}
                color="white"
              />
            </TouchableOpacity>
          </View>
        </TouchableNativeFeedback>
      </View>
      {menuOpened && <DropDownMenu />}
    </>
  );
};

export default SavedRollsListItem;

const styles = StyleSheet.create({
  rollButton: {
    backgroundColor: Colors.primary,
    height: 60,
    width: "100%",
    borderRadius: 10,
    elevation: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    paddingHorizontal: 20,
    height: 60,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "space-between",
  },
  text: {
    color: "white",
  },
  dropDown: {
    width: "90%",
    alignSelf: "center",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  textContainer: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  }
});
