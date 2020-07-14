import React, { useRef, useState } from "react";
import { StyleSheet, FlatList, View, Dimensions, Button } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector } from "react-redux";
import { Modalize } from "react-native-modalize";

import HeaderButton from "../components/HeaderButton";
import SavedRollsListItem from "../components/SavedRollsListItem";
import DefaultText from "../components/DefaultText";
import BoldText from "../components/BoldText";
import RedBorder from "../components/RedBorder";
import Colors from "../constants/colors";

const initialState = {
  id: "",
  title: "",
  rolls: [{ id: "", numDice: 0, typeDice: "", mod: 0 }],
};

const SavedRollsScreen = (props) => {
  const [selectedRoll, setSelectedRoll] = useState({ initialState });
  const [selectRollsResult, setSelectRollsResult] = useState([]);

  const rolls = useSelector((state) => state.rolls.userRolls);

  //controlador do Modal
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const rollDice = (dice, numberDice, mod) => {
    //realiza a rolagem
    const diceType = parseInt(dice.substr(1, 2));
    let rollResults = {
      rollArr: [],
      rollSum: 0,
    };
    for (let counter = 0; counter < numberDice; counter++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      rollResults.rollSum += roll;
      rollResults.rollArr.push(roll);
    }
    rollResults.rollSum += mod;
    console.log("rollResults:", rollResults);
    return rollResults;
  };

  const rollSelectedSavedRoll = (rollPool) => {
    let allRollsResults = [];
    rollPool.rolls.forEach((roll) => {
      const results = rollDice(roll.typeDice, roll.numDice, roll.mod);
      allRollsResults.push(results);
    });
    setSelectRollsResult(allRollsResults);
  };

  const selectedSavedRollHandler = (rollId) => {
    const touchRoll = rolls.filter((roll) => roll.id === rollId);
    setSelectedRoll(touchRoll[0]);
    rollSelectedSavedRoll(touchRoll[0]);
  };

  const renderItemFlatlist = ({ item }) => {
    return (
      <SavedRollsListItem
        data={item}
        onPress={onOpen}
        onPressRoll={selectedSavedRollHandler}
      />
    );
  };

  const rollPoolCreatorText = (roll) => {
    console.log("roll", roll);
    return `${roll.title}: ${roll.numDice} ${roll.typeDice} ${
      roll.mod !== 0 ? (roll.mod > 0 ? `+ ${roll.mod}` : roll.mod) : ""
    }`;
  };

  const rollPoolShowerText = (roll) => {
    if (!roll.rolls) {
      return;
    }
    let text = ``;
    roll.rolls.forEach((roll) => {
      text += `| ${rollPoolCreatorText(roll)} |`;
    });
    return text;
  };

  const rollPoolShowerResult = (roll) => {
    console.log('roll result', roll)
    roll.forEach((roll) => {
        
    });
  };

  return (
    <>
      <Modalize
        ref={modalizeRef}
        modalHeight={Dimensions.get("window").height / 2}
        rootStyle={styles.rootModal}
        modalTopOffset={100}
      >
        <View style={styles.modalTextContainer}>
          <BoldText>{selectedRoll.title}</BoldText>
          <DefaultText>{rollPoolShowerText(selectedRoll)}</DefaultText>
          {rollPoolShowerResult(selectRollsResult)}
        </View>
      </Modalize>
      <View style={styles.screen}>
        <View style={styles.listContainer}>
          <FlatList
            data={rolls}
            keyExtractor={(item) => item.id}
            renderItem={renderItemFlatlist}
          />
        </View>
      </View>
    </>
  );
};

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

export default SavedRollsScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  listContainer: {
    width: "90%",
  },
  modalTextContainer: {
    marginTop: 20,
    alignItems: "center",
  },
});
