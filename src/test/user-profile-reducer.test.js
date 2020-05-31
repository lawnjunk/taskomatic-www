import {createStore} from 'redux'
import {Map} from 'immutable'

import * as action from '../store/action'
import userProfile from '../store/reducer/user-profile-reducer.js'

const mockState = {
  id: 'HAHA',
  email: 'hello@wat.com',
  firstName: 'cool', 
  lastName: 'sweet',
  username: 'coolsweet',
}

describe('userProfile reducer', () => {
  test('userProfile reducer', () => {
    const store = createStore(userProfile)
    expect(store.getState()).toEqual(Map({ data:null, error: null})) 
    store.dispatch(action.setUserProfile(mockState))
    expect(store.getState().get('data')).toEqual(mockState)
    store.dispatch(action.setUserProfile(null))
    expect(store.getState().get('data')).toEqual(null)
    store.dispatch(action.setUserProfileError(new Error('hello')))
    expect(store.getState().get('error')).toEqual(new Error('hello'))
    store.dispatch(action.setUserProfile(mockState))
    expect(store.getState().get('error')).toEqual(null)
    store.dispatch(action.setUserProfileError(new Error('hello')))
    store.dispatch(action.setUserProfileError(null))
    expect(store.getState().get('error')).toEqual(null)
    try {
      store.dispatch(action.setUserProfileError("HELLO"))
      throw new Error('failed')
    } catch (e) {
      expect(e.message.startsWith('Error: VALIDATION_ERROR')).toBeTruthy()
    }

    try {
      store.dispatch(action.setUserProfile({}))
      throw new Error('failed')
    } catch (e) {
      expect(e.message.startsWith('Error: VALIDATION_ERROR')).toBeTruthy()
    }
  })
})
