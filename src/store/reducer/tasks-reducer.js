import {combineReducers} from 'redux'

import {createReducer} from '../../lib/create-reducer.js'
import {isString, isBool, isArray, isStateError} from '../../lib/util.js'
import {List} from 'immutable'

import {
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASKS_ERROR,
} from '../action'

export const isTask = (data) => {
  if(!isString(data.id)) return false
  if(!isString(data.userID)) return false
  if(!isString(data.description)) return false
  if(!isBool(data.completed)) return false
  return true
}

export const isTaskList = (data) => {
  if(!isArray(data)) return false
  return data.reduce((result, value) => {
    result && isTask(value)
  }, true)
}

let defaultState = List()
export const data = (state=defaultState, {type, payload}) => {
  switch(type){
    case SET_TASKS:
      validate(SET_TASKS, payload, isTaskList) 
      return payload
    case ADD_TASK:
      validate(ADD_TASK, payload, isTask)
      return state.push(payload)
    case UPDATE_TASK:
      validate(UPDATE_TASK, payload, isTask)
      return state.map(task => {
        if(task.id == payload.id)
          return payload
        return task
      })
    case DELETE_TASK:
      validate(DELETE_TASK, payload, isTask)
      return state.filter(task => task.id != payload.id)
    case RESET:
      return defaultState
    default:
      return state
  }
}

export const error = createReducer(SET_TASKS_ERROR, null, isStateError)
export default  combineReducers({data, error})
