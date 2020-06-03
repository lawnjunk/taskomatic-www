// external deps
import {combineReducers} from 'redux'

// internal modules
import {createReducer, validate} from '../../lib/create-reducer.js'
import {isBoolean, isStateError, isString} from '../../lib/util.js'


import {
  LOGOUT,
  SET_AUTH_ERROR,
  SET_TOKEN,
  SET_UPDATE_PASSWORD_SUCCESS,
} from '../action'
  
const defaultState = null
export const token = (state=defaultState, {type, payload}) => {
  switch(type){
    case SET_TOKEN:
      validate(SET_TOKEN, payload, isString)
      return payload
    case LOGOUT:
    case 'RESET':
      return defaultState
    default:
      return state
  }
}

export const authError = createReducer(SET_AUTH_ERROR, null, isStateError)

export default combineReducers({
  authError,
  token,
})
