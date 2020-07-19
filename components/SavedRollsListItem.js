import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from 'react-redux'
import { Audio } from 'expo-av';
import * as rollActions from '../store/rolls-actions'

import Colors from "../constants/colors";
import BoldText from "./BoldText";
import RedBorder from "../components/RedBorder";
import DefaultText from "./DefaultText";

const SavedRollsListItem = (props) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const dispatch = useDispatch()
  

  const dropDownHandler = () => {
    if (!menuOpened) {
      setMenuOpened(true);
    } else {
      setMenuOpened(false);
    }
  };

  const renderItemFlatlist = ({ item }) => {
    return (
      <View>
        <DefaultText>
          {item.title}: {item.numDice} {item.typeDice} {item.mod > 0 ? "+" : ""}{" "}
          {item.mod === 0 ? "" : item.mod}
        </DefaultText>
      </View>
    );
  };

  const rollIdProvider = () => {
    props.onPressRoll(props.data.id)
  }

  const deleteRollHandler = (id) => {
    Alert.alert("Você tem certeza?", "Você deseja excluir essa rolagem?", [
      {
        text: "Não",
        style: "default",
      },
      {
        text: "Sim",
        style: "destructive",
        onPress: () => dispatch(rollActions.deleteRoll(id))
      },
    ]);
    
  }

  //Controlador de som
  const soundObject = new Audio.Sound()
  const soundState = useSelector(state => state.config.state)
  const playRollDiceSound = async () => {
    if(soundState) {
      try {
        await soundObject.loadAsync(require('../assets/dice-roll.mp3'))
        await soundObject.playAsync()
      } catch(err) {
        console.log(err)
      }
    } 
  }

  const DropDownMenu = () => {
    return (
      <RedBorder style={styles.dropDown}>
        <View style={styles.textContainer}>
          <FlatList
            style={styles.flatlist}
            data={props.data.rolls}
            renderItem={renderItemFlatlist}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => props.onPressEditButton(props.data.id)} >
            <MaterialCommunityIcons
              name="square-edit-outline"
              size={32}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteRollHandler(props.data.id)} >
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
        <TouchableNativeFeedback onPress={() => {
          props.onPress()
          rollIdProvider()
          playRollDiceSound()
        } }>
          <View style={styles.button}>
            <BoldText style={styles.text}>{props.data.title}</BoldText>
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
    zIndex: 1,
  },
  textContainer: {
    margin: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
});
