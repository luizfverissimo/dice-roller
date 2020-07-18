import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, FlatList, View, Dimensions } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useSelector, useDispatch } from "react-redux";
import { Modalize } from "react-native-modalize";
import nextId from "react-id-generator";
import * as rollActions from "../store/rolls-actions";

import HeaderButton from "../components/HeaderButton";
import SavedRollsListItem from "../components/SavedRollsListItem";
import DefaultText from "../components/DefaultText";
import BoldText from "../components/BoldText";
import RedBorder from "../components/RedBorder";
import Colors from "../constants/colors";

const initialState = {
  id: "",
  title: "",
  rolls: [
    {
      id: "",
      numDice: 0,
      typeDice: "",
      mod: 0,
      title: "",
      poolText: "",
      rollResults: {
        rollSum: 0,
        rollArr: [],
      },
    },
  ],
};

const SavedRollsScreen = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(rollActions.loadRolls());
  }, [dispatch]);

  const [selectedRoll, setSelectedRoll] = useState({});
  const [selectedRollResults, setSelectedRollResults] = useState([]);

  //controlador do Modal
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  //pega as rolagens do state
  const rolls = useSelector((state) => state.rolls.userRolls);

  //compara as rolagens com a rolagem que foi tocada e salva no estado selectedRoll
  const selectedSavedRollHandler = (rollId) => {
    const touchRoll = rolls.filter((roll) => roll.id === rollId);
    setSelectedRoll(touchRoll[0]);
    rollSelectedSavedRoll(touchRoll[0]);
  };

  //realiza a rolagem
  const rollDice = (dice, numberDice, mod) => {
    //tira o dado da string 'D4' = 4
    const diceType = parseInt(dice.substr(1, 2));
    const numberDiceNum = parseInt(numberDice);

    //objeto que levará o resultado
    let rollResults = {
      rollArr: [],
      rollSum: 0,
      rollText: "",
    };
    for (let counter = 0; counter < numberDiceNum; counter++) {
      //rola o dado e add no array
      const roll = Math.floor(Math.random() * diceType) + 1;
      rollResults.rollSum += roll;
      rollResults.rollArr.push(roll);
    }

    if (mod === "") {
      rollResults.rollSum += 0;
    } else if (mod !== "") {
      const modNum = parseInt(mod);
      rollResults.rollSum += modNum;
    }

    //cria o text de resultado
    rollResults.rollText = `${dice}: ${rollResults.rollArr.toString()}`;
    return rollResults;
  };

  //cria o texto do pool, ex: 1 d20 + 2
  const rollPoolCreatorText = (roll) => {
    return `${roll.title}: ${roll.numDice} ${roll.typeDice} ${
      roll.mod !== 0 ? (roll.mod > 0 ? `+ ${roll.mod}` : roll.mod) : ""
    }`;
  };

  const rollSelectedSavedRoll = (rollPool) => {
    let allRollsResult = [];
    rollPool.rolls.forEach((roll) => {
      let results = rollDice(roll.typeDice, roll.numDice, roll.mod);
      const poolText = rollPoolCreatorText(roll);
      results = { ...results, poolText: poolText };

      const id = nextId();
      results = { ...results, id: id };

      allRollsResult.push(results);
    });
    setSelectedRollResults(allRollsResult);
  };

  const renderItemFlatlist = ({ item }) => {
    return (
      <SavedRollsListItem
        data={item}
        onPress={onOpen}
        onPressRoll={selectedSavedRollHandler}
        onPressEditButton={editRollHandler}
      />
    );
  };

  const renderItemFlatlistModal = ({ item }) => {
    return (
      <View style={styles.modalTextContainer}>
        <BoldText>{item.poolText}</BoldText>
        <RedBorder style={styles.redBorder}>
          <BoldText style={styles.sumText}>{item.rollSum}</BoldText>
        </RedBorder>
        <DefaultText>{item.rollText}</DefaultText>
      </View>
    );
  };

  const editRollHandler = (id) => {
    props.navigation.navigate("NewRoll", { rollId: id });
  };

  const NoRollWarning = () => {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <DefaultText style={{ textAlign: "center" }}>
          Não há rolagem salva, adicione uma nova rolagem.
        </DefaultText>
      </View>
    );
  };

  return (
    <>
      <Modalize
        ref={modalizeRef}
        modalHeight={Dimensions.get("window").height / 2}
        rootStyle={styles.rootModal}
        modalTopOffset={100}
        onClosed={() => setSelectedRollResults({})}
        flatListProps={{
          data: selectedRollResults,
          renderItem: renderItemFlatlistModal,
          keyExtractor: (item) => item.id,
          style: { marginVertical: 20 },
        }}
      ></Modalize>
      <View style={styles.screen}>
        <View style={styles.listContainer}>
          {rolls.length !== 0 ? (
            <FlatList
              data={rolls}
              keyExtractor={(item) => item.id}
              renderItem={renderItemFlatlist}
              style={styles.flatList}
              contentContainerStyle={styles.flatListContent}
            />
          ) : (
            <NoRollWarning />
          )}
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
  redBorder: {
    width: 50,
    height: 50,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  sumText: {
    color: Colors.primary,
    fontSize: 28,
  },
});
