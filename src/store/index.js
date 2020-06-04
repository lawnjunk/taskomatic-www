// external deps
import createSaga from 'redux-saga'
import loggerMiddleware from 'redux-logger'
import {createStore, applyMiddleware} from 'redux'
import * as storage from 'redux-storage'
import createLocalEngine from 'redux-storage-engine-localstorage'
import createSessionEngine from 'redux-storage-engine-sessionstorage'

// internal modules
import rootSaga from './saga'
import defaultReducer from './reducer'

// interface
export default (reducer=defaultReducer) => {
  // make saga middleware
  let sagaMiddleware = createSaga()

  let persistantReducer = storage.reducer(reducer)

  // make local storage persistance middleware
  let localEngine = createLocalEngine('taskomatic')
  let localMiddleware = storage.createMiddleware(localEngine, [], ['SET_TOKEN'])

  // make session storage persistance middleware
  let sessionEngine = createSessionEngine('taskomatic')
  let sessionMiddleware = storage.createMiddleware(sessionEngine, ['SET_TOKEN'])

  // create store
  let store = createStore(persistantReducer, 
    applyMiddleware(localMiddleware, sessionMiddleware, sagaMiddleware, loggerMiddleware))

  // rehydrate from localStorage
  storage.createLoader(localEngine)(store)
  .catch(console.error)

  // rehydrate from session storage
  storage.createLoader(sessionEngine)(store)
  .catch(console.error)

  // add saga listeners
  sagaMiddleware.run(rootSaga)

  // return store
  return store
}
