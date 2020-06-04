import request from 'superagent'
import {takeEvery, put} from 'redux-saga/effects'
import {API_URL} from '@env'

import {
  addTask,
  setTasks,
  updateTask,
  deleteTask,
  setTasksError,
  FETCH_TASKS_REQUEST,
  CREATE_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
  DELETE_TASK_REQUEST,
} from '../action'

export const doFetchTasksRequest = function* ({payload}) {
  try {
    const {body} = yield request.get(API_URL + '/task')
      .set('Authorization', 'Bearer ' + payload.token)
    yield put(setTasks(body))
  } catch (e) {
    yield put(setTasksError(e))
  }
}

export const doCreateTaskRequest = function* ({payload}) {
  try {
    const {body} = yield request.post(API_URL + '/task')
      .set('Authorization', 'Bearer ' + payload.token)
      .send(Object.assign({}, payload, {token: undefined}))
    yield put(addTask(body))
  } catch (e) {
    yield put(setTasksError(e))
  }
}

export const doUpdateTaskRequest = function* ({payload}) {
  try {
    const {body} = yield request.put(`${API_URL}/task/${payload.id}`)
      .set('Authorization', 'Bearer ' + payload.token)
      .send(Object.assign({}, payload, {token: undefined}))
    yield put(updateTask(body))
  } catch (e) {
    yield put(setTasksError(e))
  }
}

export const doDeleteTaskRequest = function* ({payload}) {
  try {
    yield request.delete(`${API_URL}/task/${payload.task.id}`)
      .set('Authorization', 'Bearer ' + payload.token)
    yield put(deleteTask(payload.task))
  } catch (e) {
    yield put(setTasksError(e))
  }
}

export const spawnFetchTasksRequset = function* (){
  yield takeEvery(FETCH_TASKS_REQUEST, doFetchTasksRequest)
}

export const spawnCreateTaskRequest = function* (){
  yield takeEvery(CREATE_TASK_REQUEST, doCreateTaskRequest)
}

export const spawnUpdateTaskRequest = function* (){
  yield takeEvery(UPDATE_TASK_REQUEST, doUpdateTaskRequest)
}


export const spawnDeleteTaskRequest = function*(){
  yield takeEvery(DELETE_TASK_REQUEST, doDeleteTaskRequest)
}
