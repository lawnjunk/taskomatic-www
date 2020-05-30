import {combineReducers} from 'redux'
import {createReducer} from '../../lib/create-reducer.js'
import {isArray, isStateError} from '../../lib/util.js'
import {isProfile} from './user-profile.js'

import {
  SET_ALL_PROFILES,
  SET_ALL_PROFILES_ERROR,
}

export const isAllProfiles = (data) => {
  if(!isArray(data)) return false
  return data.reduce((result, value) => {
    result && isProfile(value)
  }, true)
}

export const data = createReducer(SET_ALL_PROFILES, null, isAllProfiles)
export const error = createReducer(SET_ALL_PROFILES_ERROR, null, isStateError)
export default combineReducers({data, error})


