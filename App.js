import React, {useState} from "react";
import { AppLoading } from "expo";
import * as Font from 'expo-font'

import RollNavigator from "./navigation/RollNavigator";

const fetchFonts = () => {
  return Font.loadAsync({
    'roboto': require('./assets/Roboto-Medium.ttf'),
    'robotoBold': require('./assets/Roboto-Bold.ttf')
  })
}

export default function App() {
  const [isLoad, setIsLoad] = useState(false)
  if(!isLoad) {
    return <AppLoading  startAsync={fetchFonts} onFinish={() => setIsLoad(true)} />
  }

  return <RollNavigator />;
}
