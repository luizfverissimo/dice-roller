import React, { useState } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import rollsReducer from "./store/rolls-reducers";

import RollNavigator from "./navigation/RollNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    roboto: require("./assets/Roboto-Medium.ttf"),
    robotoBold: require("./assets/Roboto-Bold.ttf"),
  });
};

const rootReducer = combineReducers({
  rolls: rollsReducer,
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
    <Provider store={store} >
      <RollNavigator />
    </Provider>
  );
}
