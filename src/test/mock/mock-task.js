import * as faker from 'faker'
import request from 'superagent'
import {API_URL} from '@env'

import {mockUser} from './mock-user.js'

export const mockTaskInput = () => ({
  description: faker.lorem.sentences(2)
})

export const mockTask = async () => {
  let userMock = await mockUser()
  let input = mockTaskInput()
  const {body:task} = await request.post(API_URL + '/task')
    .set('Authorization', 'Bearer ' + userMock.token)
    .send(input)
  return {input, userMock, task}
}


