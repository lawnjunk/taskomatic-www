import {all} from 'redux-saga/effects'

import {
  spawnSignupRequest 
} from './auth.js'

export default function root*(){
  yield all([
    spawnSignupRequest,
  ])
}
