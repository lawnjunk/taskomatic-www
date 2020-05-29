import {combineReducers} from 'redux'
import assert from 'assert'

import {createReducer, validate} from '../../lib/create-reducer.js'
import {isBoolean, isError, isString} from '../../lib/util.js'


import {
  SET_AUTH_ERROR,
  SET_TOKEN,
  SET_LOGOUT,
  SET_UPDATE_PASSWORD_SUCCESS,
} from '../action'
  
export const authError = createReducer(SET_AUTH_ERROR, null, isError)
export const updatePasswordSuccess = createReducer(SET_UPDATE_PASSWORD_SUCCESS, true, isBoolean)

export const token = (state=null, {type, payload}) => {
  switch(type){
    case SET_TOKEN:
      validate(SET_TOKEN, payload, isString)
      return payload
    case SET_LOGOUT:
    case 'RESET':
      return null
    default:
      return state
  }
}

export const auth = combineReducers({
  updatePasswordSuccess,
  authError,
  token,
})
