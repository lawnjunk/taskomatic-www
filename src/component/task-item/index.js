
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'


// internal mods
import { deleteTaskRequest } from '../../store/action'

// internal components 
import TaskForm from '../task-form'

class TaskItem extends React.Component {
  render = () => {
    let {task, token} = this.props
    return (
      <div className='task-item' key={this.props.key}>
        <p> {task.description} </p>
        <button onClick={() => this.props.deleteTaskRequest({token, task})}>Delete</button>
        <TaskForm task={task} />
      </div>
    )
  }
}

const mapStateToProps = state => ({ token: state.auth.token })

const mapDispatchToProps = dispatch => bindActionCreators({ deleteTaskRequest }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem)

