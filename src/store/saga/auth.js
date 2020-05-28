import request from 'superagent'
import {takeEvery, put} from 'redux-saga/effects'


import  {
  setToken,
  authError,
} from '../action'


export const doSignupRequest = function* (userData){
  const authURL = process.env.API_URL + '/auth'
  try {
    const res = yield request.post(authURL).send(userData)
    console.log(res)

    //console.log('body', body)
    yield put(setToken(res.body.token))
  } catch (e) {
    console.log(e)
    yield put(authError(e))
  }
}

export const spawnSignupRequest = function* () {
  yield takeEvery(SIGNUP_REQUEST, doSignupRequest)
}
