import {combineReducers} from 'redux'
import {createReducer} from '../../lib/create-reducer.js'
import {isArray, isStateError, validate} from '../../lib/util.js'
import {isProfile} from './user-profile-reducer.js'
import {Map} from 'immutable'

import {
  RESET,
  SET_ALL_PROFILES,
  SET_ALL_PROFILES_ERROR,
} from '../action'

export const isAllProfiles = (data) => {
  if(!isArray(data)) return false
  return data.reduce((result, value) => {
    return result && isProfile(value)
  }, true)
}

let defaultState = Map({data: [], error: null})
export default (state=defaultState, {type, payload}) => {
  switch(type){
    case SET_ALL_PROFILES:
      validate(SET_ALL_PROFILES, payload, isAllProfiles)
      return state.set('data', payload).set('error', null)
    case SET_ALL_PROFILES_ERROR:
      validate(SET_ALL_PROFILES_ERROR, payload, isStateError)
      return state.set('error', payload)
    case RESET:
      return defaultState
    default:
      return state
  }
}


