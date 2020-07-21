import React from "react";
import { View, Button, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerItemList,
} from "@react-navigation/drawer";

import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";

import RollScreen, {
  screenOptions as RollScreenOptions,
} from "../screens/RollScreen";
import SavedRollsScreen, {
  screenOptions as SavedRollsScreenOptions,
} from "../screens/SavedRollsScreen";
import NewRollScreen, {
  screenOptions as NewRolScreenOptions,
} from "../screens/NewRollScreen";
import AboutScreen, {
  screenOptions as AboutScreenOptions,
} from "../screens/AboutScreen";

import SoundSwitch from '../components/SoundSwitch'

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
  );
};

const AboutStackNavigator = createStackNavigator();

const AboutNavigator = () => {
  return (
    <AboutStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AboutStackNavigator.Screen
        name="About"
        component={AboutScreen}
        options={AboutScreenOptions}
      />
    </AboutStackNavigator.Navigator>
  );
};

const RollDrawerNavigator = createDrawerNavigator();

const RollDrawer = () => {
  return (
    <NavigationContainer>
      <RollDrawerNavigator.Navigator
        drawerContent={(props) => {
          return (
            <View style={{ flex: 1, paddingTop: 20 }}>
              <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
                <DrawerItemList {...props} />
                <SoundSwitch />
              </SafeAreaView>
            </View>
          );
        }}
        drawerContentOptions={{
          activeTintColor: Colors.primary,
        }}
      >
        <RollDrawerNavigator.Screen
          name="Rolagens"
          component={RollNavigator}
          options={{
            drawerIcon: (props) => {
              return (
                <FontAwesome5
                  name="dice-d20"
                  size={23}
                  color={props.color}
                />
              );
            },
          }}
        />
        <RollDrawerNavigator.Screen
          name="Sobre"
          component={AboutNavigator}
          options={{
            drawerIcon: (props) => {
              return (
                <MaterialCommunityIcons
                  name="information-outline"
                  size={24}
                  color={props.color}
                />
              );
            },
          }}
        />
      </RollDrawerNavigator.Navigator>
    </NavigationContainer>
  );
};

export default RollDrawer;
