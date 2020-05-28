
require('dotenv').config(`${__dirname}/../.env`)

import {put} from 'redux-saga/effects' 
import {doSignupRequest} from '../store/saga/auth.js'
import * as action from '../store/action'

let mock = {
  username: 'slugbyte', 
  email: 'slugbyte@slugbyte.com',
  password: 'helloworld', 
  firstName: 'slug', 
  lastName: 'byte',
}


describe('auth-saga',  () => {
  test('doSignupRequest', async () => {
    let  gen = doSignupRequest(mock)
    let {body} = await gen.next().value
    let result = await gen.next({body}).value
    expect(result).toEqual(put(action.setToken(body.token)))
  })
})
