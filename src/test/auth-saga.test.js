
require('dotenv').config(`${__dirname}/../.env`)

import {put} from 'redux-saga/effects' 
import * as action from '../store/action'
import {
  doSignupRequest,
  doLoginRequest,
  doUpdatePasswordRequest,
} from '../store/saga/auth.js'

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

  test('ERROR doSignupRequest', async () => {
    let badMock = Object.assign({}, mock, {username: undefined})
    let  gen = doSignupRequest(badMock)
    await gen.next().value
      .then(() => Promise.reject(new Error('failed')))
      .catch(e => {
        expect(e.status).toEqual(400)
        expect(e.message).toEqual('Bad Request')
      })
  })

  test('doLoginRequest', async () => {
    let  gen = doLoginRequest(mock)
    let {body} = await gen.next().value
    // Note: store token for updatePassword
    mock.token = body.token
    expect(typeof body.token).toBe("string")
    let result = await gen.next({body}).value
    expect(result).toEqual(put(action.setToken(body.token)))
  })
  
  test('ERROR doLoginRequest', async () => {
    let badMock = Object.assign({}, mock, {password: 'badpassword'})
    let  gen = doLoginRequest(badMock)
    await gen.next().value
      .then(() => Promise.reject(new Error('failed')))
      .catch(e => {
        expect(e.status).toBe(401)
        expect(e.message).toBe('Unauthorized')
      })
      
  })

  test('doUpdatePasswordRequest', async () => {
    let gen = doUpdatePasswordRequest({
      token: mock.token, 
      password: 'new-example-password'
    })
    let res = await gen.next().value
    expect(res.status).toBe(200)
    let result = await gen.next().value
    expect(result).toEqual(put(action.setUpdatePasswordSuccess(true)))
  })

  test('ERROR doUpdatePasswordRequest', async () => {
    let gen = doUpdatePasswordRequest({
      password: 'new-example-password'
    })
    await gen.next().value
      .then(() => Promise.reject('failed'))
      .catch(e => {
        expect(e.status).toBe(401)
      })
  })

  test('ERROR doUpdatePasswordRequest', async () => {
    let gen = doUpdatePasswordRequest({
      token: mock.token,
      password: '1234'
    })
    await gen.next().value
      .then((e) => {
        console.log('stat', e.status)
        return Promise.reject('failed')
      })
      .catch(e => {
        expect(e.status).toBe(400)
      })
  })
})
