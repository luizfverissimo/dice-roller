import { insertRoll, fetchRolls, updateRolls, deleteRollDb } from "../helpers/db";

import SavedRolls from "../model/SavedRolls";

export const CREATE_ROLL = "CREATE_ROLL";
export const UPDATE_ROLL = "UPDATE_ROLL";
export const DELETE_ROLL = "DELETE_ROLL";
export const ADD_ROLL = "ADD_ROLL";
export const SET_ROLLS = "SET_ROLLS";

export const loadRolls = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchRolls();
      console.log(dbResult);

      dispatch({
        type: SET_ROLLS,
        rolls: dbResult.rows._array,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addRoll = (title, rolls) => {
  return async (dispatch) => {
    try {
      const rollsString = await JSON.stringify(rolls);
      const dbResult = await insertRoll(title, rollsString);
      dispatch({
        type: ADD_ROLL,
        savedRoll: {
          id: dbResult.insertId,
          title: title,
          rolls: rolls,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateRoll = (id, title, rolls) => {
  return async (dispatch) => {
    try {
      const rollsString = await JSON.stringify(rolls);
      const dbResult = await updateRolls(title, rollsString, id);
      dispatch({
        type: UPDATE_ROLL,
        savedRoll: {
          id: dbResult.insertId,
          title: title,
          rolls: rolls,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteRoll = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await deleteRollDb(id);
      dispatch({
        type: DELETE_ROLL,
        id: id,
      });
    } catch (err) {
      console.log(err);
    }
  };
};
