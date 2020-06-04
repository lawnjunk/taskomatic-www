import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import  {bindActionCreators} from 'redux'

// internal modules
import { fetchTasksRequest } from '../../store/action'

// internal components
import TaskForm from '../task-form'
import TaskItem from '../task-item'

// interface
class Dashboard extends React.Component {
  componentDidMount = () => {
    this.props.fetchTasksRequest({token: this.props.token})
  }

  render = () => {
    return (
      <main className='Dashboard-container'>
        {!this.props.token ? <Redirect to='/' from='/dashboard' />: undefined}
        <h2>Dashboard</h2>
        <TaskForm  />
        <div>
          {this.props.tasks.map((task, key) => <TaskItem key={key} task={task} />)}
        </div>
      </main>
    )
  }
}

export const mapStateToProps = state => ({
  token: state.auth.token,
  tasks: state.tasks.get('data').toArray().reverse()
})

export const mapDispatchToProps = dispatch => bindActionCreators({fetchTasksRequest}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
