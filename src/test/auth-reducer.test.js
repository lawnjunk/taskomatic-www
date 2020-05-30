import {createStore} from 'redux'

import auth, {
  updatePasswordSuccess,
  authError,
  token,
} from '../store/reducer/auth-reducer.js'

import * as action from '../store/action'

describe('auth reducer', () => {
  test('token', () => {
    let store = createStore(token)
    expect(store.getState()).toBeNull()
    store.dispatch(action.setToken('1234'))
    expect(store.getState()).toBe('1234')

    try {
      store.dispatch(action.setToken({}))
      throw new Error('failed')
    } catch (e) {
      expect(e.message).toBe('Error: VALIDATION_ERROR for SET_TOKEN')
    }
  })

  test('authError', () => {
    let store = createStore(authError)
    expect(store.getState()).toBeNull()
    let err = new Error('example')
    store.dispatch(action.setAuthError(err))
    expect(store.getState()).toBe(err)

    try {
      store.dispatch(action.setAuthError({}))
      throw new Error('failed')
    } catch (e) {
      expect(e.message).toBe('Error: VALIDATION_ERROR for SET_AUTH_ERROR')
    }
  })

  test('auth', () => {
    let store = createStore(auth)
    expect(store.getState()).toEqual({
      token: null,
      authError: null,
    })
  })
})
