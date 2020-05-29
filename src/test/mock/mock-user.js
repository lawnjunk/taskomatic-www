import * as faker from 'faker'
import request from 'superagent'
import {API_URL} from '@env'

export const mockUserInput = () => ({
  username: faker.internet.userName() + faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
})

export const mockUser = async () => {
  let input = mockUserInput()
  let {body} = await request.post(API_URL + '/auth')
    .send(input)
  let token = body.token
  let {body:profile} = await(request.get(API_URL + '/profile/self'))
    .set('Authorization', 'Bearer ' + token)
  return {input, token, profile}
}

