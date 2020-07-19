export const SET_SOUND = 'SET_SOUND'

export const setSound = (state) => {
  return async (dispatch) => {
    dispatch({
      type: SET_SOUND,
      state: state
    })
  }
}