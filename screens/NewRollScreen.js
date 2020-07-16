import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
  Picker,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Col, Row, Grid } from "react-native-easy-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import nextId from "react-id-generator";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import BoldText from "../components/BoldText";
import Card from "../components/Card";
import Colors from "../constants/colors";

const NewRollScreen = (props) => {
  const id = props.route.params ? props.route.params.rollId : null;
  const selectedRoll = useSelector((state) =>
    state.rolls.userRolls.find((roll) => roll.id === id)
  );

  const flatlist = useRef(null);

  const initialRoll = {
    id: nextId(),
    numDice: "",
    typeDice: "",
    mod: "",
    title: "",
    poolText: "",
    rollResults: {
      rollSum: 0,
      rollArr: [],
    },
  };

  const [rollTitle, setRollTitle] = useState(
    selectedRoll ? selectedRoll.title : ""
  );
  const [selectedRolls, setSelectedRolls] = useState(
    selectedRoll ? selectedRoll.rolls : [initialRoll]
  );

  const inputHandler = (id, key, input) => {
    const state = selectedRolls;
    const modifiedState = state.map((rolls) => {
      if (rolls.id === id) {
        rolls[key] = input;
      }
      return rolls;
    });
    setSelectedRolls(modifiedState);
    console.log("selecteRolls on inputhandler", selectedRolls)
  };

  const addInputHandler = () => {
    const newId = { ...initialRoll, id: nextId() };
    setSelectedRolls((rolls) => [...rolls, newId]);
  };

  const removeInputHandler = (id) => {
    if (selectedRolls.length === 1) {
      Alert.alert("Atenção", "Você precisa ter pelo menos uma rolagem.", [
        { text: "OK" },
      ]);
      return;
    }
    const rollsFiltered = selectedRolls.filter((roll) => roll.id !== id);
    setSelectedRolls(rollsFiltered);
  };

  const submitHandler = () => {
    /* selectedRolls.map(roll => console.log("roll", roll)) */
    console.log("submitedHandler", selectedRolls);
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Adicionar Rolagem"
              iconName={"content-save"}
              onPress={submitHandler}
            />
          </HeaderButtons>
        );
      },
    });
  }, []);

  const renderItemFlatList = ({ item }) => {
    return (
      <Card style={styles.card}>
        <View style={styles.formCard}>
          <DefaultText>Rolagem</DefaultText>
          <TextInput
            style={styles.input}
            value={item.title}
            onChangeText={(text) => inputHandler(item.id, "title", text)}
          />
        </View>
        <Grid>
          <Col>
            <View style={styles.formCard}>
              <DefaultText>Número</DefaultText>
              <TextInput
                style={styles.input}
                value={item.numDice}
                keyboardType="numeric"
                onChangeText={(text) => inputHandler(item.id, "numDice", text)}
              />
            </View>
          </Col>
          <Col>
            <View style={styles.formCard}>
              <DefaultText>Dado</DefaultText>
              <Picker
                selectedValue={item.typeDice}
                onValueChange={(itemValue) =>
                  inputHandler(item.id, "typeDice", itemValue)
                }
              >
                <Picker.Item label="D4" value="D4" />
                <Picker.Item label="D6" value="D6" />
                <Picker.Item label="D8" value="D8" />
                <Picker.Item label="D10" value="D10" />
                <Picker.Item label="D12" value="D12" />
                <Picker.Item label="D20" value="D20" />
              </Picker>
            </View>
          </Col>
          <Col>
            <View style={styles.formCard}>
              <DefaultText>Mod.</DefaultText>
              <TextInput
                style={styles.input}
                value={item.mod}
                keyboardType="numeric"
                onChangeText={(text) => inputHandler(item.id, "mod", text)}
              />
            </View>
          </Col>
        </Grid>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => removeInputHandler(item.id)}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </Card>
    );
  };

  return (
    <View style={styles.form}>
      <View style={styles.formControl}>
        <BoldText>Nome da Rolagem</BoldText>
        <TextInput
          style={styles.input}
          value={rollTitle}
          onChangeText={(text) => setRollTitle(text)}
        />
      </View>
      <FlatList
        data={selectedRolls}
        renderItem={renderItemFlatList}
        style={styles.flatList}
        ref={flatlist}
        onContentSizeChange={() => flatlist.current.scrollToEnd()}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={addInputHandler}>
          <MaterialCommunityIcons
            name="plus-circle"
            size={32}
            color={Colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const screenOptions = (navData) => {
  const routeParam = navData.route.params ? navData.route.params : {};
  return {
    headerTitle: routeParam.rollId ? "Editar Rolagem" : "Adicionar Rolagem",
  };
};

export default NewRollScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  card: {
    margin: 10,
  },
  formCard: {
    margin: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    fontFamily: "roboto",
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  flatList: {
    height: "80%",
    marginVertical: 20,
  },
});
