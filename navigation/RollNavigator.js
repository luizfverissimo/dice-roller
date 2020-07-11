import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import RollScreen, {
  screenOptions as RollScreenOptions,
} from "../screens/RollScreen";
import SavedRollsScreen, {
  screenOptions as SavedRollsScreenOptions,
} from "../screens/SavedRollsScreen";
import NewRollScreen, {
  screenOptions as NewRolScreenOptions,
} from "../screens/NewRollScreen";

import Colors from "../constants/colors";

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: "white",
  headerTitleStyle: {
    fontFamily: "robotoBold",
  },
};

const RollStackNavigator = createStackNavigator();

const RollNavigator = () => {
  return (
    <NavigationContainer>
      <RollStackNavigator.Navigator
        initialRouteName="Roll"
        screenOptions={defaultNavOptions}
      >
        <RollStackNavigator.Screen
          name="Roll"
          component={RollScreen}
          options={RollScreenOptions}
        />
        <RollStackNavigator.Screen
          name="SavedRoll"
          component={SavedRollsScreen}
          options={SavedRollsScreenOptions}
        />
        <RollStackNavigator.Screen
          name="NewRoll"
          component={NewRollScreen}
          options={NewRolScreenOptions}
        />
      </RollStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default RollNavigator;
