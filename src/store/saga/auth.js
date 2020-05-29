import request from 'superagent'
import {takeEvery, put} from 'redux-saga/effects'

import  {
  setToken, 
  authError,
  setUpdatePasswordSuccess,
  SIGNUP_REQUEST,
  LOGIN_REQUEST,
  UPDATE_PASSWORD_REQUEST,
  SET_UPDATE_PASSWORD_SUCCESS,
} from '../action'

// NOTE: authURL can't be a constant because babel evals
// the file before the enviroment is configured
const authURL = () => process.env.API_URL + '/auth'

export const doSignupRequest = function* (userData){
  try {
    console.log({userData})
    const res = yield request.post(authURL()).send(userData)
    yield put(setToken(res.body.token))
  } catch (e) {
    yield put(authError(e))
  }
}

export const doLoginRequest = function* ({email, password}){
  try {
    const res = yield request.get(authURL()).auth(email, password)
    yield put(setToken(res.body.token))
  } catch (e) {
    console.log('foo')
    yield put(authError(e))
  }
}

export const doUpdatePasswordRequest = function* ({token, password}) {
  try {
    const res = yield request.put(authURL())
      .set('Authorization', 'Bearer ' + token)
      .send({password})
    yield put(setUpdatePasswordSuccess(true))
  } catch (e) {
    yield put(authError(e))
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
