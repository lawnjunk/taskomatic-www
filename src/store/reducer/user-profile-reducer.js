import {combineReducers} from 'redux'

import {createReducer} from '../../lib/create-reducer.js'
import {isEmail, isStateError, isString} from '../../lib/util.js'

import {
  SET_USER_PROFILE,
  SET_USER_PROFILE_ERROR,
}

export const isProfile = (data) => {
  if(!isString(data.id)) return false
  if(!isEmail(data.email)) return false
  if(!isString(data.firstName)) return false
  if(!isString(data.lastName)) return false
  if(!isString(data.username)) return false
  return true
}

export const data = createReducer(SET_USER_PROFILE, null, isProfile)
export const error = createReducer(SET_USER_PROFILE_ERROR, null, isStateError)
export default combineReducers({data, error})
