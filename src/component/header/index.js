import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../../store/action'
import {bindActionCreators} from 'redux'

class Header extends React.Component {
  render = () => {
    return (
      <header>
        <h1>Task-o-Matic</h1>

      <button onClick={() => this.props.logout()}>Logout</button>
      </header>
    )
  }
}

let mapDispatchToProps = (dispatch) => bindActionCreators({logout}, dispatch)
export default connect(null, mapDispatchToProps)(Header)
