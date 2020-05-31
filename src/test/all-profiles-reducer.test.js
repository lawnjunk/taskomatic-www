import {Map} from 'immutable'
import {createStore} from 'redux'
import faker from 'faker'

import allProfiles from '../store/reducer/all-profiles-reducer.js'
import * as action from '../store/action'

const mockUser = () => ({ 
    id: faker.lorem.sentence(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
})

const mockAllProfiles = [
  mockUser(),
  mockUser(),
  mockUser(),
]

describe('allProfiles reducer', () => {
  test('inital state', () => {
    const store = createStore(allProfiles)
    expect(store.getState().get('data')).toEqual([])
    expect(store.getState().get('error')).toBeNull()
  })

  test('SET_ALL_PROFILES mockAllProfiles', () => {
    const store = createStore(allProfiles)
    store.dispatch(action.setAllProfiles(mockAllProfiles))
    expect(store.getState().get('data')).toEqual(mockAllProfiles)
    expect(store.getState().get('error')).toBeNull()
  })

  test('SET_ALL_PROFILES []', () => {
    const store = createStore(allProfiles)
    store.dispatch(action.setAllProfiles(mockAllProfiles))
    store.dispatch(action.setAllProfiles([]))
    expect(store.getState().get('data')).toEqual([])
    expect(store.getState().get('error')).toBeNull()
  })

  test('SET_ALL_PROFILES_ERROR', () => {
    const store = createStore(allProfiles)
    store.dispatch(action.setAllProfilesError(new Error('test')))
    expect(store.getState().get('data')).toEqual([])
    expect(store.getState().get('error')).toEqual(new Error('test'))
  })

  test('SET_ALL_PROFILES resets error', () => {
    const store = createStore(allProfiles)
    store.dispatch(action.setAllProfiles(mockAllProfiles))
    store.dispatch(action.setAllProfilesError(new Error('test')))
    store.dispatch(action.setAllProfiles([]))
    expect(store.getState().get('data')).toEqual([])
    expect(store.getState().get('error')).toBeNull()
  })

  test('RESET', () => {
    const store = createStore(allProfiles)
    store.dispatch(action.setAllProfiles(mockAllProfiles))
    store.dispatch(action.setAllProfiles(mockAllProfiles))
    store.dispatch(action.setAllProfilesError(new Error('test')))
    store.dispatch(action.reset())
    expect(store.getState().get('data')).toEqual([])
    expect(store.getState().get('error')).toBeNull()
  })

  test('data validator', () => {
    const store = createStore(allProfiles)
    try {
      store.dispatch(action.setAllProfiles({}))
      throw new Error('failed')
    } catch (e) {
      expect(e.message.startsWith('Error: VAL')).toBeTruthy()
    }
  })
  
  test('error validator', () => {
    const store = createStore(allProfiles)
    try {
      store.dispatch(action.setAllProfilesError({}))
      throw new Error('failed')
    } catch (e) {
      expect(e.message.startsWith('Error: VAL')).toBeTruthy()
    }
  })

})
