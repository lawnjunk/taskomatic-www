// external deps
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

// internal mods
import {loginRequest} from '../../store/action'
import {isEmail} from '../../lib/util.js'

// internal components
import FormField from '../form-field'

// interface
class LoginForm extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      emailErrorMessage: '',
      emailDirty: false,
      password: '',
      passwordErrorMessage: '',
      passwordDirty: false,
      formErrorMessage: '',
      formSumbitted: false,
      valid: false,
    }

    this.state.email = 'hello@world.com'
    this.state.password = 'helloworld'
  }

  // instance methods
  getErrorMessage = (name, value) => {
    switch(name){
      case 'email':
        if(!value)
          return 'The email field is a required'
        if(!isEmail(value))
          return 'Must enter a valid email.'
        return
      case 'password':
        if(!value)
          return 'The password field is a required'
        return
      default: 
        return 'Unknown error'
    }
  }

  validate = () => {
    this.setState(state => {
      let emailErrorMessage = this.getErrorMessage('email', state.email) 
      let passwordErrorMessage = this.getErrorMessage('password', state.password) 
      let valid = !(emailErrorMessage || passwordErrorMessage)
      return {
        emailErrorMessage,
        passwordErrorMessage,
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
    this.props.loginRequest(this.state)
  }

  // life cycle hooks
  componentDidMount = () => {
    this.validate()
  }
  render = () =>  {
    return (
      <form className='signup-form' onSubmit={this.handleSubmit}>
        <div className='fields'>
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
          <input type='submit' value='Sign up' />
        </div>
      </form>
    )
  }
}

export const mapDispatchToProps = (dispatch) => 
  bindActionCreators({loginRequest}, dispatch)

export default connect(null,  mapDispatchToProps)(LoginForm)

