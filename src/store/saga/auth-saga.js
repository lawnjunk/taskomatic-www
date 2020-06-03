// external deps
import request from 'superagent'
import {takeEvery, put} from 'redux-saga/effects'
import {API_URL} from '@env'
import {isObject} from '../../lib/util.js'

// internal modules
import  {
  setToken, 
  setAuthError,
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  UPDATE_PASSWORD_REQUEST,
} from '../action'

// module consants
const authURL = API_URL + '/auth'

const validatePayload = (payload) => {
  if(!isObject(payload))
    throw new Error('payload must be an object')
}

// interface
export const doSignupRequest = function* ({payload:user}){
  validatePayload(user)
  try {
    const res = yield request.post(authURL).send(user)
    yield put(setToken(res.body.token))
  } catch (e) {
    yield put(setAuthError(e))
  }
}

export const doLoginRequest = function* ({payload}){
  validatePayload(payload)
  try {
    const res = yield request.get(authURL).auth(payload.email, payload.password)
    yield put(setToken(res.body.token))
  } catch (e) {
    yield put(setAuthError(e))
  }
}

export const doUpdatePasswordRequest = function* ({payload}) {
  validatePayload(payload)

  try {
    const res = yield request.put(authURL)
      .set('Authorization', 'Bearer ' + payload.token)
      .send({password: payload.password})
    yield put(setAuthError(null))
  } catch (e) {
    yield put(setAuthError(e))
  }
}

export const spawnSignupRequest = function* () {
  yield takeEvery(SIGNUP_REQUEST, doSignupRequest)
}

export const spawnLoginRequest = function* () {
  yield takeEvery(LOGIN_REQUEST, doLoginRequest)
}

export const spawnUpdatePasswordSuccess = function* () {
  yield takeEvery(UPDATE_PASSWORD_REQUEST, doUpdatePasswordRequest)
}
