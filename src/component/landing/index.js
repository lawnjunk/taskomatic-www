import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import * as action from '../../store/action'
import SignupForm from '../signup-form'
import LoginForm from '../login-form'

class Landing extends React.Component {
  constructor(props){
    super(props)
  }

  render = () => {
    console.log('this.prpps', this.props)
    return (
      <main className='landing-container'>
      {!!this.props.token ? <Redirect to='/dashboard' from='/' />: <p> hello </p>}
      <div className='onboarding'>
        <section className='auth-form-container'>
          <SignupForm />
          <LoginForm />
        </section>
      </div>
      <div className='demo'>
      </div>
      </main>
    )
  }
}

export const mapStateToProps = (state) => ({
  token: state.auth.token,
})

export const mapDispatchToProps = (dispatch) => ({
  login: (credentials) => dispatch(action.loginRequest(credentials)),
  signup: (credentials) => dispatch(action.signupRequest(credentials)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Landing)
