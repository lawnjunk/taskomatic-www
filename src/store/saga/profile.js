// external deps
import request from 'superagent'
import {takeEvery, put} from 'redux-saga/effects'
import {API_URL} from '@env'

// internal modules
import {
  setUserProfile,
  setUserProfileError, 
  setAllProfiles,
  setAllProfilesError,
  FETCH_ALL_PROFILES_REQUEST,
  FETCH_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_REQUEST,
} from '../action'

// module constants
const profileURL = API_URL + '/profile'

// interface
export const doFetchUserProfileRequest = function* ({token}) {
  try {
    const {body} = yield request.get(profileURL + '/self')
      .set('Authorization', 'Bearer ' + token)
    yield put(setUserProfile(body))
  } catch (e) { 
    yield put(setUserProfileError(e))
  }
}

export const doFetchAllProfilesRequest = function* ({token}) {
  try {
    const {body} = yield request.get(profileURL)
      .set('Authorization', 'Bearer ' + token)
    yield put(setAllProfiles(body))
  } catch (e) {
    yield put(setAllProfilesError(e))
  }
}


export const doUpdateUserProfileRequest = function* ({token, profile}) {
  try {
    const {body} = yield request.put(profileURL + '/self')
      .set('Authorization', 'Bearer ' + token)
      .send(profile)
    yield put(setUserProfile(body))
  } catch (e) {
    yield put(setUserProfileError(e))
  }
}

export const spawnFetchAllProfilesRequest = function* () {
  yield takeEvery(FETCH_ALL_PROFILES_REQUEST, doFetchAllProfilesRequest)
}

export const spawnFetchUserProfileRequest = function* () {
  yield takeEvery(FETCH_USER_PROFILE_REQUEST, doFetchUserProfileRequest)
}

export const spawnUpdateUserProfileRequest = function* () {
  yield takeEvery(UPDATE_USER_PROFILE_REQUEST, doUpdateUserProfileRequest)
}


