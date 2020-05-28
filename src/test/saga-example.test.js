import createStore from '../store'
import reducer from '../store/reducer'
import {decAsync} from '../store/action'
import {inc, incAsync} from '../store/action'
import {put} from 'redux-saga/effects'

import {incramentAsync} from '../store/saga/index.js'

describe('saga example', () => {
  test.only('inc', (next) => {
    const store = createStore(reducer)
    store.dispatch(decAsync())
    store.dispatch(decAsync())
    store.dispatch(decAsync())

    setTimeout(() => {
      console.log(store.getState())
      next()
    }, 600)
  })

  test('counter saga', async () =>  {
    let gen = incramentAsync()
    gen.next() // run the delay
    expect(gen.next().value).toEqual(put(inc(2)))
  })

})
