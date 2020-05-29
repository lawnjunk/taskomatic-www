import {put} from 'redux-saga/effects'
import * as action  from '../store/action'

import {mockUser} from './mock/mock-user.js'
import {mockTask, mockTaskInput} from './mock/mock-task.js'

import {
  doFetchTasksRequest,
  doCreateTaskRequest,
  doUpdateTaskRequest,
} from '../store/saga/task.js'

describe('task-saga', () => {
  test('doFetchTasksRequest',  async () => {
    let mock = await mockUser()
    let gen = doFetchTasksRequest({token: mock.token})
    let {body} = await gen.next().value
    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBe(0)
    let result = gen.next({body}).value
    expect(result).toEqual(put(action.setTasks(body)))
  })

  test('doCreateTaskRequest',  async () => {
    let mock = await mockUser()
    let input = mockTaskInput()
    let gen = doCreateTaskRequest({token: mock.token, task: input})
    let {body} = await gen.next().value
    expect(body).toBeInstanceOf(Object)
    expect(body.description).toBe(input.description)
    let result = gen.next({body}).value
    expect(result).toEqual(put(action.addTask(body)))
  })

  test('doUpdateTaskRequest',  async () => {
    let mock = await mockTask()
    let input = Object.assign({}, mock.task, mockTaskInput())
    let gen = doUpdateTaskRequest({token: mock.userMock.token, task: input})
    let {body} = await gen.next().value
    expect(body).toBeInstanceOf(Object)
    expect(body.description).toBe(input.description)
    let result = gen.next({body}).value
    expect(result).toEqual(put(action.updateTask(body)))
  })

})
