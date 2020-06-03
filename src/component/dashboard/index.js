import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Dashboard extends React.Component {
  render = () => {
    return (
      <main className='Dashboard-container'>
        {!this.props.token ? <Redirect to='/' from='/dashboard' />: undefined}
        <h2>Dashboard</h2>
      </main>
    )
  }
}

export const mapStateToProps = (state) => ({
  token: state.auth.token,
})

export const mapDispatchToProps = (dispatch) => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
