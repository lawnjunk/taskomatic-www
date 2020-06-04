import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {signupRequest} from '../../store/action'

import {isEmail} from '../../lib/util.js'

import FormField from '../form-field'

class SignupForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      userNameErrorMessage: '',
      usernameDirty: false,
      firstName: '',
      firstNameErrorMessage: '',
      fistNameDirty: false,
      lastName: '',
      lastNameErrorMessage: '',
      lastNameDirty: false,
      email: '',
      emailErrorMessage: '',
      emailDirty: false,
      password: '',
      passwordErrorMessage: '',
      passwordDirty: false,
      passwordConfirm: '',
      passwordConfirmErrorMessage: '',
      passwordConfirmDirty: false,
      formErrorMessage: '',
      formSumbitted: false,
      valid: false,
    }

    //this.state.firstName= 'hello'
    //this.state.lastName = 'world'
    //this.state.username = 'helloworld'
    //this.state.email = 'hello@world.com'
    //this.state.password  = 'helloworld'
    //this.state.passwordConfirm  = 'helloworld'
  }


  getErrorMessage = (name, value) => {
    switch(name){
      case 'firstName':
        if(!value)
          return 'The First Name is a required'
        return 
      case 'lastName':
        if(!value)
          return 'The Last Name is a required'
        return 
      case 'username':
        if(!value)
          return 'The username field is a required'
        if(value.length < 8)
          return 'Username must be at least 8 charicters'
        return 
      case 'email':
        if(!value)
          return 'The email field is a required'
        if(!isEmail(value))
          return 'Must enter a valid email.'
        return
      case 'password':
        if(!value)
          return 'The password field is a required'
        if(value.length < 7)
          return 'password must be at least 8 charicters'
        return
      case 'passwordConfirm':
        if(value !== this.state.password)
          return 'The passwords you entered do not match'
        return 
      default: 
        return 'Unknown error'
    }
  }

  validate = () => {
    this.setState(state => {
      let firstNameErrorMessage = this.getErrorMessage('firstName', state.firstName) 
      let lastNameErrorMessage = this.getErrorMessage('lastName', state.lastName) 
      let emailErrorMessage = this.getErrorMessage('email', state.email) 
      let usernameErrorMessage = this.getErrorMessage('username', state.username) 
      let passwordErrorMessage = this.getErrorMessage('password', state.password) 
      let passwordConfirmErrorMessage = this.getErrorMessage('passwordConfirm', state.passwordConfirm) 
      let valid = !(firstNameErrorMessage || lastNameErrorMessage || emailErrorMessage
        || usernameErrorMessage || passwordErrorMessage || passwordConfirmErrorMessage)
      return {
        firstNameErrorMessage,
        lastNameErrorMessage,
        emailErrorMessage,
        usernameErrorMessage,
        passwordErrorMessage,
        passwordConfirmErrorMessage,
        valid,
      }
    })
  }

  handleChange = (e) => {
    let {name, value} = e.target
    this.setState({
      [name]: value,
      [name + 'Dirty']: true,
    })
    this.validate()
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.validate()
    if(!this.state.valid)
      return this.setState({
        formSumbitted: true,
        formErrorMessage: 'Please fix all fields with warning labels'
      })
    this.props.signupRequest(this.state)
  }

  // Life Cycle hooks
  componentDidMount = () => {
    this.validate()
  }

  render = () =>  {
    return (
      <form className='signup-form' onSubmit={this.handleSubmit}>
        <div className='fields'>
          <FormField 
           form={this}
           name='username'
           placeholder='Username'
           />
          <FormField 
           form={this}
           name='firstName'
           placeholder='First Name'
           />
          <FormField
           form={this}
           name='lastName'
           placeholder='Last Name'
           />
          <FormField
           form={this}
           name={'email'}
           placeholder='Email'
           type='email'
           />
          <FormField
           form={this}
           name={'password'}
           placeholder='Password'
           type='password'
           />
          <FormField
           form={this}
           name={'passwordConfirm'}
           placeholder='Confirm Password'
           type='password'
           />
          <input type='submit' value='Sign up' />
        </div>
      </form>
    )
  }
}


export const mapDispatchToProps = (dispatch) => 
  bindActionCreators({signupRequest}, dispatch)

export default connect(null, mapDispatchToProps)(SignupForm)
