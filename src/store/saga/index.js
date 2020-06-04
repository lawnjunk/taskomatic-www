import {all} from 'redux-saga/effects'

import {
  spawnSignupRequest, 
  spawnLoginRequest,
  spawnUpdatePasswordSuccess,
} from './auth-saga.js'

import {
  spawnFetchAllProfilesRequest,
  spawnFetchUserProfileRequest,
  spawnUpdateUserProfileRequest,
} from './profile-saga.js'


import {
  spawnFetchTasksRequset,
  spawnCreateTaskRequest,
  spawnUpdateTaskRequest,
  spawnDeleteTaskRequest,
} from './task-saga.js'

export default function* rootSaga(){
  yield all([
    // auth-saga
    spawnSignupRequest(),
    spawnLoginRequest(),
    spawnUpdatePasswordSuccess(),
    // profile-saga
    spawnFetchAllProfilesRequest(),
    spawnFetchUserProfileRequest(),
    spawnUpdateUserProfileRequest(),
    // task
    spawnFetchTasksRequset(),
    spawnCreateTaskRequest(),
    spawnUpdateTaskRequest(),
    spawnDeleteTaskRequest(),
  ])
}
