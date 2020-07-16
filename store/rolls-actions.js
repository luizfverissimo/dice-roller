import * as FileSystem from 'expo-file-system'

import SavedRolls from "../model/SavedRolls"

export const CREATE_ROLL = 'CREATE_ROLL'
export const UPDATE_ROLL = 'UPDATE_ROLL'
export const DELETE_ROLL = 'DELETE_ROLL'
export const ADD_ROLL = 'ADD_ROLL'

export const fetchRoll = () => {
  return async (dispatch, getState) => {
  }
}

export const addRoll = (title, rolls) => {
  return {
    type: ADD_ROLL, savedRoll: {
      title: title,
      rolls: rolls
    }
  }
}

export const updateRoll = (id, title, rolls) => {
  return {
    type: UPDATE_ROLL,
    savedRoll: {
      id: id,
      title: title,
      rolls: rolls
    }
  }
}

export const deleteRoll = (id) => {
  return {
    type: DELETE_ROLL,
    id: id
  }
}