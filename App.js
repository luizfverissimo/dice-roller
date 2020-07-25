import React, { useState } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import { init } from "./helpers/db";
import Colors from "./constants/colors";

import rollsReducer from "./store/rolls-reducers";
import configReducer from './store/config-reducers'

import RollNavigator from "./navigation/RollNavigator";

//inicia a DB SQL
init()
  .then(() => console.log("initialized DB"))
  .catch((err) => console.log("initialized Fail", err));

const fetchFonts = () => {
  return Font.loadAsync({
    roboto: require("./assets/Roboto-Medium.ttf"),
    robotoBold: require("./assets/Roboto-Bold.ttf"),
  });
};

const rootReducer = combineReducers({
  rolls: rollsReducer,
  config: configReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [isLoad, setIsLoad] = useState(false);
  if (!isLoad) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setIsLoad(true)} />
    );
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        barStyle='light-content'
        backgroundColor={Colors.primary}
        />
        <RollNavigator />
    </SafeAreaView>
      
    </Provider>
  );
}
