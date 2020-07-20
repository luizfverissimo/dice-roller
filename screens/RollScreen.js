import React, { useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Modalize } from "react-native-modalize";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import nextId from "react-id-generator";

import HeaderButton from "../components/HeaderButton";
import RollButton from "../components/RollButton";
import Card from "../components/Card";
import BoldText from "../components/BoldText";
import DefaultText from "../components/DefaultText";
import DiceButtons from "../components/DiceButtons";
import RollModalButton from "../components/RollModalButton";
import RedBorder from "../components/RedBorder";
import HistoryList from "../components/HistoryList";

import Colors from "../constants/colors";

const RollScreen = (props) => {
  const dicePoolInitial = {
    D4: 0,
    D6: 0,
    D8: 0,
    D10: 0,
    D12: 0,
    D20: 0,
    plus: 0,
    minus: 0,
    mod: 0,
  };

  const [rollPool, setRollPool] = useState([]);
  const [dicePool, setDicePool] = useState({ dicePoolInitial });
  const [rollResults, setRollResults] = useState({});
  const [rollStats, setRollStats] = useState({});
  const [rollHistoric, setRollHistoric] = useState([]);

  //controlador do Modal
  const modalizeRef = useRef(null);
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  //filtra o estado e cria um obj com os dados e o número de cada um
  const filterDicePool = (pool) => {
    let dicePools = {
      mod: 0,
    };
    pool.forEach((dice) => {
      if (dice === "plus") {
        dicePools.mod = dicePools.mod + (dicePools[dice] || 0) + 1;
        dicePools[dice] = 0;
        return;
      }

      if (dice === "minus") {
        dicePools.mod = dicePools.mod - ((dicePools[dice] || 0) + 1);
        dicePools[dice] = 0;
        return;
      }

      dicePools[dice] = (dicePools[dice] || 0) + 1;
    });
    setDicePool(dicePools);
  };

  //useEffect que atualiza o texto com o novo dado inserido
  useEffect(() => {
    filterDicePool(rollPool);
  }, [rollPool]);

  //função que percorre o obj e cria um texto para ser mostrado
  let diceTextFinal;
  const diceCounter = () => {
    let diceText = "";

    const diceTextGenerator = (dice) => {
      if (!dicePool[dice]) {
        return;
      }
      if (dice === "mod") {
        diceText += ` ${dicePool.mod > 0 ? "+" : ""}${dicePool.mod}`;
        return;
      }
      diceText += ` ${dicePool[dice]} ${dice},`;
    };
    diceTextGenerator("D4");
    diceTextGenerator("D6");
    diceTextGenerator("D8");
    diceTextGenerator("D10");
    diceTextGenerator("D12");
    diceTextGenerator("D20");
    diceTextGenerator("mod");

    //gerar o texto do pool
    diceTextFinal = diceText;
    return diceText;
  };

  //Adiciona o dado selecionado pelo botão no state e filtra os dados criando um obj - dicePool
  const addDiceToPoolHandler = (dice) => {
    setRollPool(rollPool.concat(dice));
  };

  const rollDicePoolHandler = (pool) => {
    let results = {
      D4Roll: [],
      D6Roll: [],
      D8Roll: [],
      D10Roll: [],
      D12Roll: [],
      D20Roll: [],
      rollMod: 0,
      rollSum: 0,
    };

    const rollPoolObj = (pool) => {
      //rolar o número de vezes de cada key do obj dicepool
      const rollDice = (dice, numberDice) => {
        //realiza a rolagem
        const diceType = parseInt(dice.substr(1, 2));
        let rollArr = [];
        for (let counter = 0; counter < numberDice; counter++) {
          const roll = Math.floor(Math.random() * diceType) + 1;
          rollArr.push(roll);
        }
        return rollArr;
      };

      const rollAndAddToArray = () => {
        Object.keys(pool).forEach((dice) => {
          if (pool[dice] === 0) {
            return;
          }
          const rolls = rollDice(dice, pool[dice]);
          //armazenar a rolagem de cada dado em um array
          switch (dice) {
            case "D4":
              rolls.forEach((roll) => results.D4Roll.push(roll));
              break;
            case "D6":
              rolls.forEach((roll) => results.D6Roll.push(roll));
              break;
            case "D8":
              rolls.forEach((roll) => results.D8Roll.push(roll));
              break;
            case "D10":
              rolls.forEach((roll) => results.D10Roll.push(roll));
              break;
            case "D12":
              rolls.forEach((roll) => results.D12Roll.push(roll));
              break;
            case "D20":
              rolls.forEach((roll) => results.D20Roll.push(roll));
              break;
            case "plus":
              break;
            case "minus":
              break;
            case "mod":
              results.rollMod = pool["mod"];
              break;
          }
        });
      };

      rollAndAddToArray();

      //somar todas as rolagens para gerar um valor final
      const sum = (rolls) => {
        let sumRoll = 0;
        Object.keys(rolls).forEach((diceRolls) => {
          if (diceRolls === "rollMod") {
            sumRoll += parseInt(rolls[diceRolls]);

            return;
          } else if (diceRolls === "rollSum") {
            return;
          } else if (rolls[diceRolls].length !== 0) {
            rolls[diceRolls].forEach((roll) => {
              sumRoll += parseInt(roll);
            });
          }
        });
        results.rollSum = sumRoll;
      };

      sum(results);
      setRollResults(results);
    };
    rollPoolObj(pool);
  };

  //gerar o texto de cada rolagem individual armazenada no array de cada dado
  const rollResultsPerDice = (results) => {
    let rollResultsText = "";
    Object.keys(results).forEach((diceRolls) => {
      if (diceRolls === "rollMod" || diceRolls === "rollSum") return;

      if (results[diceRolls].length !== 0) {
        const resultsString = results[diceRolls].toString();
        switch (diceRolls) {
          case "D4Roll":
            rollResultsText += ` D4: ${resultsString} |`;
            break;
          case "D6Roll":
            rollResultsText += ` D6: ${resultsString} |`;
            break;
          case "D8Roll":
            rollResultsText += ` D8: ${resultsString} |`;
            break;
          case "D10Roll":
            rollResultsText += ` D10: ${resultsString} |`;
            break;
          case "D12Roll":
            rollResultsText += ` D12: ${resultsString} |`;
            break;
          case "D20Roll":
            rollResultsText += ` D20: ${resultsString} |`;
            break;
        }
      } else {
        return;
      }
    });
    return rollResultsText;
  };

  useEffect(() => {
    //gerar o texto do pool
    const rollResulTextFinal = rollResultsPerDice(rollResults);
    setRollStats({
      diceTextFinal: diceTextFinal,
      rollResulTextFinal: rollResulTextFinal,
      rollSum: rollResults.rollSum,
    });
  }, [rollResults]);

  //add a rolagem no histórico
  useEffect(() => {
    const id = nextId();
    let rollStastWithId = { ...rollStats, ...{ id: id } };

    setRollHistoric((historic) => [...historic, rollStastWithId]);
  }, [rollStats]);

  //gerar o texto do valor total
  const rollSumResultFinal = () => {
    let finalText = "";
    finalText = rollResults.rollSum !== 0 ? rollResults.rollSum : "";
    return finalText;
  };

  //renderItem Flatlist
  const renderItemFlatlist = ({ item }) => {
    if (
      !item.rollSum ||
      !item.diceTextFinal ||
      !item.rollResulTextFinal ||
      !item.rollSum === 0
    ) {
      return;
    }
    return (
      <HistoryList
        rollPool={item.diceTextFinal}
        rollSum={item.rollSum}
        rollResults={item.rollResulTextFinal}
      />
    );
  };

  const flatlist = useRef(null);

  //Controlador de som
  const soundObject = new Audio.Sound();
  const soundState = useSelector((state) => state.config.state);
  const playRollDiceSound = async () => {
    if (soundState) {
      try {
        await soundObject.loadAsync(require("../assets/dice-roll.mp3"));
        await soundObject.playAsync();
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <Modalize
        ref={modalizeRef}
        modalHeight={
          Dimensions.get("window").height < 900
            ? Dimensions.get("window").height / 1.8
            : Dimensions.get("window").height / 2
        }
        rootStyle={styles.rootModal}
        modalTopOffset={100}
        onClosed={() => {
          setRollPool([]);
          setDicePool(dicePoolInitial);
        }}
      >
        <View style={styles.buttons}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <RedBorder style={styles.redBorder}>
              <DefaultText style={styles.textRedBorder}>
                {diceCounter()}
              </DefaultText>
            </RedBorder>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                setRollPool([]);
                setDicePool(dicePoolInitial);
              }}
            >
              <MaterialCommunityIcons
                name="cancel"
                size={32}
                color={Colors.primary}
              />
            </TouchableOpacity>
          </View>
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
              onPress={() => addDiceToPoolHandler("plus")}
            />
            <DiceButtons
              icon="minus"
              style={styles.diceButtons}
              onPress={() => addDiceToPoolHandler("minus")}
            />
          </View>
          <View style={styles.diceButtonsContainer}>
            <RollModalButton
              title="ROLAR"
              onPress={() => {
                rollDicePoolHandler(dicePool);
                modalizeRef.current?.close();
                playRollDiceSound();
              }}
            />
          </View>
        </View>
      </Modalize>

      <View style={styles.screen}>
        <Card style={styles.card}>
          <DefaultText style={styles.diceText}>
            {rollStats.diceTextFinal}
          </DefaultText>
          <RedBorder style={styles.redBorderRoll}>
            <BoldText style={styles.textRedBorderRoll}>
              {rollSumResultFinal()}
            </BoldText>
          </RedBorder>
          <DefaultText style={styles.diceText}>
            {rollStats.rollResulTextFinal}
          </DefaultText>
        </Card>
        <View style={styles.textContainer}>
          <BoldText style={styles.textBold}>Histórico</BoldText>
        </View>
        <FlatList
          style={styles.flatlistContainer}
          contentContainerStyle={styles.flatlist}
          data={rollHistoric}
          renderItem={renderItemFlatlist}
          keyExtractor={(item) => item.id}
          ref={flatlist}
          onContentSizeChange={() => flatlist.current.scrollToEnd()}
          inverted
        />
        <RollButton style={styles.rollButton} onPress={onOpen} />
      </View>
    </>
  );
};

export default RollScreen;

export const screenOptions = (navData) => {
  return {
    headerTitle: "Rolagens",

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
    width: "70%",
    height: 60,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textRedBorder: {
    padding: 5,
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
  diceText: {
    margin: 10,
  },
  redBorderRoll: {
    width: "25%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textRedBorderRoll: {
    color: Colors.primary,
    fontSize: 38,
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
  flatlistContainer: {
    height: Dimensions.get('window').height < 500 ? "35%" : "18%",
    flexGrow: 0,
    width: "80%",
  },
  flatlist: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
});
