import {combineReducers} from 'redux'
import {Map} from 'immutable'
import {isNull, isEmail, isStateError, isString, validate} from '../../lib/util.js'

import {
  RESET,
  SET_USER_PROFILE,
  SET_USER_PROFILE_ERROR,
} from '../action'

export const isProfile = (data) => {
  if(isNull(data)) return true
  if(!isString(data.id)) return false
  if(!isEmail(data.email)) return false
  if(!isString(data.firstName)) return false
  if(!isString(data.lastName)) return false
  if(!isString(data.username)) return false
  return true
}

let defaultState = Map({data: null, error: null})
export default (state=defaultState, {type, payload}) => {
  switch(type){
    case SET_USER_PROFILE:
      validate(SET_USER_PROFILE, payload, isProfile)
      return state.set('data', payload).set('error', null)
    case SET_USER_PROFILE_ERROR:
      validate(SET_USER_PROFILE_ERROR, payload, isStateError)
      return state.set('error', payload)
    case RESET:
      return defaultState
    default:
      return state
  }
}
