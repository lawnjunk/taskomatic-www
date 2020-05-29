// external deps
import request from 'superagent'
import {takeEvery, put} from 'redux-saga/effects'
import {API_URL} from '@env'

// internal modules
import  {
  setToken, 
  setAuthError,
  setUpdatePasswordSuccess,
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  UPDATE_PASSWORD_REQUEST,
} from '../action'

// module consants
const authURL = API_URL + '/auth'

// interface
export const doSignupRequest = function* (userData){
  try {
    const res = yield request.post(authURL).send(userData)
    yield put(setToken(res.body.token))
  } catch (e) {
    yield put(setAuthError(e))
  }
}

export const doLoginRequest = function* ({email, password}){
  try {
    const res = yield request.get(authURL).auth(email, password)
    yield put(setToken(res.body.token))
  } catch (e) {
    yield put(setAuthError(e))
  }
}

export const doUpdatePasswordRequest = function* ({token, password}) {
  try {
    const res = yield request.put(authURL)
      .set('Authorization', 'Bearer ' + token)
      .send({password})
    // TODO: is true enough data for the UI?
    yield put(setUpdatePasswordSuccess(true))
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
