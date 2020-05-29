import {put} from 'redux-saga/effects'
import * as action  from '../store/action'

import {mockUser} from './mock/mock-user.js'

import {
  doFetchUserProfileRequest,
  doFetchAllProfilesRequest,
  doUpdateUserProfileRequest,
} from '../store/saga/profile.js'

describe('profile sagas',  () => {
  test('doFetchUserProfile', async () => {
    let mock = await mockUser()
    const gen = doFetchUserProfileRequest({token: mock.token})
    const {body} = await gen.next().value
    expect(body.email).toBe(mock.input.email)
    expect(body).toEqual(mock.profile)
    const result = gen.next({body}).value
    expect(result.payload.action.type).toBe(action.SET_USER_PROFILE)
    expect(result).toEqual(put(action.setUserProfile(body)))
  })

  test('doFetchAllProfiles', async () => {
    let mock = await mockUser()
    let gen = doFetchAllProfilesRequest({token: mock.token})
    const {body} = await gen.next().value
    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBeGreaterThan(1)
    const result = gen.next({body}).value
    expect(result).toEqual(put(action.setAllProfiles(body)))
  })

  test('doUpdateUserProfileRequest', async () => {
    let mock = await mockUser()
    let gen = doUpdateUserProfileRequest({
      token: mock.token,
      profile: {firstName: 'Crazy-Name'}, 
    })
    let {body} = await gen.next().value
    expect(body.id).toEqual(mock.profile.id)
    expect(body.firstName).toEqual('Crazy-Name')
  })
})

