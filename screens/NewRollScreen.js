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
  KeyboardAvoidingView,
  Dimensions
} from "react-native";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Col, Grid } from "react-native-easy-grid";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import nextId from "react-id-generator";

import { useDispatch } from "react-redux";
import * as rollActions from "../store/rolls-actions";

import HeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import BoldText from "../components/BoldText";
import Card from "../components/Card";
import Colors from "../constants/colors";

const NewRollScreen = (props) => {
  //pega a id da rolagem salva
  const id = props.route.params ? props.route.params.rollId : null;
  //o objeto da rolagem salva de acordo com o id
  const selectedRoll = useSelector((state) => {
    const rollSelected = state.rolls.userRolls.find((roll) => roll.id === id);
    return rollSelected;
  });

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

  //state que armazena o título da rolagem
  const [rollTitle, setRollTitle] = useState(
    selectedRoll ? selectedRoll.title : ""
  );
  //state que armazena as rolagens
  const [selectedRolls, setSelectedRolls] = useState(
    selectedRoll ? selectedRoll.rolls : [initialRoll]
  );

  const dispatch = useDispatch();

  //salva dos dados no state conforme o preenchimento
  const inputHandler = (id, key, input) => {
    const state = selectedRolls;
    const modifiedState = state.map((rolls) => {
      if (rolls.id === id) {
        rolls[key] = input;
      }
      return rolls;
    });
    setSelectedRolls(modifiedState);
  };

  //adiciona um input extra de rolagem
  const addInputHandler = () => {
    const newId = { ...initialRoll, id: nextId() };
    setSelectedRolls((rolls) => [...rolls, newId]);
  };

  //remove o input extra de rolagem
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

  //input de rolagem
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
                autoCorrect={false}
                maxLength={2}
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
                style={styles.picker}
                mode='dropdown'
              >
                <Picker.Item label="" value="" />
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
                autoCorrect={false}
                maxLength={2}
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

  //função que é disparada ao apertar o botão salvar, dispatch a ação e volta para a tela anterior
  const submitHandler = (title, rolls) => {
    let status = false;
    const inputCheckError = rolls.map((roll) => {      
      if (!roll.numDice || !roll.typeDice || !title) {
        status = true;
      } else {
        status = false;
      }
      return status;
    });
    console.log('inputCheckError', inputCheckError)

    if (inputCheckError.includes(true)) {
      Alert.alert(
        "Erro",
        "Confira os dados de rolagem, a sua rolagem precisa ter um título e os campos número e dado não podem ficar em branco",
        [{ text: "OK" }]
      );
      return;
    }

    if (id) {
      dispatch(rollActions.updateRoll(id, title, rolls));
    } else {
      dispatch(rollActions.addRoll(title, rolls));
    }

    props.navigation.goBack();
  };

  //passa a função submitHandler para o botão no header
  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="Adicionar Rolagem"
              iconName={"content-save"}
              onPress={() => submitHandler(rollTitle, selectedRolls)}
            />
          </HeaderButtons>
        );
      },
    });
  }, [submitHandler]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={100}
    >
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
        <View style={styles.buttonBottomContainer}>
          <TouchableOpacity onPress={addInputHandler}>
            <MaterialCommunityIcons
              name="plus-circle"
              size={42}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
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
    marginBottom: 5
  },
  buttonBottomContainer: {
    alignItems: "center",
    bottom: 10
  },
  flatList: {
    height: Dimensions.get("window").height < 900 ? "70%": '80%',
    marginVertical: 20,
  },
  picker: {
    width: "120%",
    fontFamily: 'roboto'
  },
});
