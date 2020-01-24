import { combineReducers } from 'redux'
import {
  UPDATE_HOME,
  ADD_BUTTON,
} from '../actions'

const joystickInitialState = {
  buttons: [],
}

const joystick = (state = joystickInitialState, action) => {
  switch (action.type) {
    case ADD_BUTTON:
      return { buttons: [...state.buttons, action.text] }
    default:
      return state
  }
}

const home = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_HOME:
      return action.data
    default:
      return state
  }
}

const rootReducer = combineReducers({
  home,
  joystick,
})

export default rootReducer
