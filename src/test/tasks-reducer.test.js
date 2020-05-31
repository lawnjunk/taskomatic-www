import {createStore} from 'redux'
import {List, Map} from 'immutable'
import faker from 'faker'

import tasks from '../store/reducer/tasks-reducer.js'
import * as action from '../store/action'

const mockTask = () => ({
  id: faker.lorem.sentence(),
  userID: faker.lorem.sentence(),
  description: faker.lorem.sentence(),
  completed: false,
})

const mockTasks = [
  mockTask(),
  mockTask(),
  mockTask(),
]

describe('tasks reducer', () => {
  test('initial state', () => {
    const store = createStore(tasks)
    expect(store.getState().get('data')).toEqual(List())
    expect(store.getState().get('error')).toBeNull()
  })

  test('SET_TASKS', () => {
    const store = createStore(tasks)
    store.dispatch(action.setTasks(mockTasks))
    expect(store.getState().get('data')).toEqual(List(mockTasks))
    expect(store.getState().get('error')).toBeNull()
  })

  test('ADD_TASK', () => {
    const store = createStore(tasks)
    let task  = mockTask()
    store.dispatch(action.addTask(task))
    expect(store.getState().get('data')).toEqual(List([task]))
    expect(store.getState().get('error')).toBeNull()
  })

  test('UPDATE_TASK', () => {
    const store = createStore(tasks)
    let task  = mockTask()
    store.dispatch(action.addTask(task))
    task.completed = true
    store.dispatch(action.updateTask(task))
    expect(store.getState().get('data').get(0).completed).toBeTruthy()
    expect(store.getState().get('error')).toBeNull()
  })

  test('DELETE_TASK', () => {
    const store = createStore(tasks)
    let task  = mockTask()
    store.dispatch(action.addTask(task))
    store.dispatch(action.deleteTask(task))
    expect(store.getState().get('data').size).toBe(0)
    expect(store.getState().get('error')).toBeNull()
  })
  
  test('SET_TASKS_ERROR', () => {
    const store = createStore(tasks)
    store.dispatch(action.setTasksError(new Error('test')))
    expect(store.getState().get('data')).toEqual(List())
    expect(store.getState().get('error')).toEqual(new Error('test'))
    let task  = mockTask()
    store.dispatch(action.addTask(task))
    expect(store.getState().get('error')).toBeNull()
  })

  


})

