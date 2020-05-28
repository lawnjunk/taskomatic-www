import {put, take, takeEvery, all} from 'redux-saga/effects'

import {
  INC_ASYNC,
  DEC_ASYNC,
  inc, 
  dec,
} from '../action'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export const incramentAsync = function* (){
  //let action = yeild take(INC_ASYNC)
  //console.log('yielded', {action})
  yield delay(500)
  yield put(inc(2))
}

export const decramentAsync = function* (){
  yield delay(500)
  yield put(dec(3))
}

function* spawnIncAsync () {
  yield takeEvery(INC_ASYNC, incramentAsync)
}

function* spawnDecAsync() {
  console.log('boom')
  yield takeEvery(DEC_ASYNC, decramentAsync)
}

export default function* rootSaga(){
  yield all([
    spawnDecAsync(),
    spawnIncAsync(),
  ])
}
