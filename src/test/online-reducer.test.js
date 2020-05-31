import {createStore} from 'redux'

import online from '../store/reducer/online-reducer.js'
import * as action from '../store/action'

describe('testing online reducer', () => {
  test('online', () =>  {
    const store = createStore(online)
    expect(store.getState()).toBe(true)
    store.dispatch(action.offline())
    expect(store.getState()).toBe(false)
    store.dispatch(action.online())
    expect(store.getState()).toBe(true)
  })
})
