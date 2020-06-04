import {combineReducers} from 'redux'

import {createReducer} from '../../lib/create-reducer.js'
import {validate, isEmpty, isString, isBoolean, isArray, isStateError} from '../../lib/util.js'
import {List, Map} from 'immutable'

import {
  RESET,
  SET_TASKS,
  ADD_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASKS_ERROR,
} from '../action'

export const isTask = (data) => {
  if(isEmpty(data))
    return false
  if(!isString(data.id)) return false
  if(!isString(data.userID)) return false
  if(!isString(data.description)) return false
  if(!isBoolean(data.completed)) return false
  return true
}

export const isTaskList = (data) => {
  if(!isArray(data)) return false
  return data.reduce((result, value) => {
    return result && isTask(value)
  }, true)
}

let listDefaultState = List()
export const dataReducer = (state=listDefaultState, {type, payload}) => {
  switch(type){
    case SET_TASKS:
      validate(SET_TASKS, payload, isTaskList) 
      return List(payload)
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
      return listDefaultState
    default:
      return state
  }
}

const errorDefaltState = null
const errorReducer = (state=errorDefaltState, {type, payload}) => {
  switch(type){
    case SET_TASKS_ERROR:
      validate(SET_TASKS_ERROR, payload, isStateError)
      return payload
    case SET_TASKS:
    case ADD_TASK:
    case UPDATE_TASK:
    case DELETE_TASK:
    case RESET:
      return errorDefaltState
    default:
      return state
  }
}

let defaultState = Map({data: List(), error: null})
export default (state=defaultState, {type, payload}) => {
  switch(type){
    case SET_TASKS:
    case ADD_TASK:
    case UPDATE_TASK:
    case DELETE_TASK:
    case SET_TASKS_ERROR:
      let data = state.get('data')
      let error = state.get('error')
      return state.set('data', dataReducer(data, {type, payload}))
                .set('error', errorReducer(error, {type, payload}))
    case RESET:
      return defaultState
    default:
      return state
  }
}

