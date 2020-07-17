import ROLLS from "../data/dummy-data";
import { ADD_ROLL, UPDATE_ROLL, DELETE_ROLL, SET_ROLLS } from "./rolls-actions";
import SavedRolls from "../model/SavedRolls";
import { ActionSheetIOS } from "react-native";

const initialState = {
  userRolls: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ROLLS:
      return {
        userRolls: action.rolls.map((roll) => {
          const rollsToArray = JSON.parse(roll.rolls);
          const newRoll = new SavedRolls(roll.id.toString(), roll.title, rollsToArray);
          return newRoll
        }),
      };

    case ADD_ROLL:
      const newSavedRoll = new SavedRolls(
        action.savedRoll.id.toString(),
        action.savedRoll.title,
        action.savedRoll.rolls
      );

      return {
        userRolls: state.userRolls.concat(newSavedRoll),
      };
    case UPDATE_ROLL:
      const rollIndex = state.userRolls.findIndex(
        (roll) => roll.id === action.savedRoll.id
      );

      const updatedRoll = new SavedRolls(
        action.savedRoll.id,
        action.savedRoll.title,
        action.savedRoll.rolls
      );

      const updatedUserRolls = [...state.userRolls];
      updatedUserRolls[rollIndex] = updatedRoll;

      return {
        ...state,
        userRolls: updatedUserRolls,
      };

    case DELETE_ROLL:
      return {
        ...state,
        userRolls: state.userRolls.filter((roll) => roll.id !== action.id),
      };

    default:
      return state;
  }
};
