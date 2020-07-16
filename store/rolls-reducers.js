import ROLLS from "../data/dummy-data"
import { ADD_ROLL, UPDATE_ROLL, updateRoll, DELETE_ROLL } from "./rolls-actions"
import SavedRolls from '../model/SavedRolls'
import nextId from "react-id-generator";


const initialState = {
  userRolls: []
}

export default (state = initialState, action) => {
  switch(action.type) {
    case ADD_ROLL:
      const id = nextId()
      const newSavedRoll = new SavedRolls(id, action.savedRoll.title, action.savedRoll.rolls )
      console.log('newSavedRoll', newSavedRoll)
      
      return {
        userRolls: state.userRolls.concat(newSavedRoll)
      }
    case UPDATE_ROLL:
      const rollIndex = state.userRolls.findIndex(roll => roll.id === action.savedRoll.id)
      
      const updatedRoll = new SavedRolls (
        action.savedRoll.id,
        action.savedRoll.title, 
        action.savedRoll.rolls
      )

      const updatedUserRolls = [...state.userRolls]
      updatedUserRolls[rollIndex] = updatedRoll
      console.log('updatedUserRolls', updatedUserRolls)

      return {
        ...state,
        userRolls: updatedUserRolls
      }
    
    case DELETE_ROLL:
      return {
        ...state,
        userRolls: state.userRolls.filter(roll => roll.id !== action.id)
      }

    default:
      return state
  }
}