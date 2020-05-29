import request from 'superagent'
import {takeEvery, put} from 'redux-saga/effects'
import {API_URL} from '@env'

import {
  addTask,
  updateTask,
  setTasks,
  FETCH_TASKS_REQUEST,
  CREATE_TASK_REQUEST,
  UPDATE_TASK_REQUEST,
} from '../action'

export const doFetchTasksRequest = function* ({token}) {
  try {
    const {body} = yield request.get(API_URL + '/task')
      .set('Authorization', 'Bearer ' + token)
    yield put(setTasks(body))
  } catch (e) {
    yield put(setTasksError(e))
  }
}

export const doCreateTaskRequest = function* ({token, task}) {
  try {
    const {body} = yield request.post(API_URL + '/task')
      .set('Authorization', 'Bearer ' + token)
      .send(task)
    yield put(addTask(body))
  } catch (e) {
    yield put(setTasksError(e))
  }
}

export const doUpdateTaskRequest = function* ({token, task}) {
  try {
    const {body} = yield request.put(`${API_URL}/task/${task.id}`)
      .set('Authorization', 'Bearer ' + token)
      .send(task)
    yield put(updateTask(body))
  } catch (e) {
    yield put(setTasksError(e))
  }
}

