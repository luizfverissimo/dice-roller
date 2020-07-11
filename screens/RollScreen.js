import React, { useRef, useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Dimensions } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Modalize } from "react-native-modalize";

import HeaderButton from "../components/HeaderButton";
import RollButton from "../components/RollButton";
import Card from "../components/Card";
import BoldText from "../components/BoldText";
import DefaultText from "../components/DefaultText";
import DiceButtons from "../components/DiceButtons";
import RollModalButton from "../components/RollModalButton";
import RedBorder from "../components/RedBorder";

import Colors from "../constants/colors";

const RollScreen = (props) => {
  const dicePoolInitial = {
    D4: 0,
    D6: 0,
    D8: 0,
    D10: 0,
    D12: 0,
    D20: 0,
    "+": 0,
    "-": 0,
  }

  const [rollPool, setRollPool] = useState([]);
  const [dicePool, setDicePool] = useState({dicePoolInitial});

  //controlador do Modal
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  //filtra o estado e cria um obj com os dados e o número de cada um
  const filterDicePool = (pool) => {
    let dicePools = {};
    pool.forEach((dice) => {
      dicePools[dice] = (dicePools[dice] || 0) + 1;
    });
    setDicePool(dicePools);
  };

  //função que percorre o obj e cria um texto para ser mostrado
  const diceCount = () => {
    let diceText = ""
    const diceTextGenerator = (dice) => {
      if(!dicePool[dice]){
        return
      }
      diceText += ` ${dicePool[dice]} ${dice} ,`
    }
    diceTextGenerator('D4')
    diceTextGenerator('D6')
    diceTextGenerator('D8')
    diceTextGenerator('D10')
    diceTextGenerator('D12')
    diceTextGenerator('D20')
    diceTextGenerator('+')
    diceTextGenerator('-')
    
    return diceText;
  };

  //useEffect que atualiza o texto com o novo dado inserido
  useEffect(() => {
    filterDicePool(rollPool);
  },[rollPool])

  //Adiciona o dado selecionado pelo botão no state e filtra os dados criando um obj - dicePool
  const addDiceToPoolHandler = (dice) => {
    setRollPool(rollPool.concat(dice));
    
  };

  return (
    <>
      <Modalize
        ref={modalizeRef}
        modalHeight={Dimensions.get("window").height / 2}
        rootStyle={styles.rootModal}
        modalTopOffset={100}
        onClosed={() => {
          setRollPool([])
          setDicePool(dicePoolInitial)
        }}
      >
        <View style={styles.buttons}>
          <RedBorder style={styles.redBorder}>
            <DefaultText style={styles.textRedBorder}>
              {diceCount()}
            </DefaultText>
          </RedBorder>
          <View style={styles.diceButtonsContainer}>
            <DiceButtons
              icon="dice-d4"
              style={styles.diceButtons}
              onPress={() => addDiceToPoolHandler("D4")}
            />
            <DiceButtons
              icon="dice-d6"
              style={styles.diceButtons}
              onPress={() => addDiceToPoolHandler("D6")}
            />
            <DiceButtons
              icon="dice-d8"
              style={styles.diceButtons}
              onPress={() => addDiceToPoolHandler("D8")}
            />
            <DiceButtons
              icon="dice-d10"
              style={styles.diceButtons}
              onPress={() => addDiceToPoolHandler("D10")}
            />
          </View>
          <View style={styles.diceButtonsContainer}>
            <DiceButtons
              icon="dice-d12"
              style={styles.diceButtons}
              onPress={() => addDiceToPoolHandler("D12")}
            />
            <DiceButtons
              icon="dice-d20"
              style={styles.diceButtons}
              onPress={() => addDiceToPoolHandler("D20")}
            />
            <DiceButtons
              icon="plus"
              style={styles.diceButtons}
              onPress={() => addDiceToPoolHandler("+")}
            />
            <DiceButtons
              icon="minus"
              style={styles.diceButtons}
              onPress={() => addDiceToPoolHandler("-")}
            />
          </View>
          <View style={styles.diceButtonsContainer}>
            <RollModalButton />
          </View>
        </View>
      </Modalize>

      <View style={styles.screen}>
        <Card style={styles.card}>
          <Text>RollScreen</Text>
        </Card>
        <View style={styles.textContainer}>
          <BoldText style={styles.textBold}>Histórico</BoldText>
        </View>
        <RollButton style={styles.rollButton} onPress={onOpen} />
      </View>
    </>
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

  buttons: {
    margin: 20,
    alignItems: "center",
  },
  redBorder: {
    width: "80%",
    height: 60,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textRedBorder: {
    padding: 5
  },
  diceButtonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  diceButtons: {
    margin: 10,
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
    color: Colors.primary,
  },
});
