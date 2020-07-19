import { SET_SOUND } from './config-actions'

const initialState = {
  state: true
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_SOUND:
      return {
        state: action.state
      }

    default:
      return state
  }
}