// external deps
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// internal mods
import {
  createTaskRequest,
  updateTaskRequest,
} from '../../store/action'


const createFormStateProp = (name, value='') => ({
  name: value,
  [name + 'ErrorMessage']: '',
  [name + 'Dirty']: false,
})

const createFormState = (props) => {
  let result = {valid: false, formSumbitted: false}

  Object.keys(props).forEach(name => {
    result[name] = props[name] || ''
    result[name + 'ErrorMessage'] = ''
    result[name + 'Dirty'] = ''
  })
  return result
}

// internal components
import FormField from '../form-field'

// interface
class TaskForm extends React.Component {
  constructor(props){
    super(props)
    this.state = createFormState({
      description: '',
      completed: false,
      token: props.token,
    })

    if(props.task)
      this.state = Object.assign({}, this.state, props.task)
  }

  // instance methods
  getErrorMessage = (name, value) => {
    switch(name){
      case 'description':
        if(!value)
          return 'The description field is a required'
        return
      default: 
        return 'Unknown error'
    }
  }

  validate = () => {
    this.setState(state => {
      let descriptionErrorMessage = this.getErrorMessage('description', state.description) 
      let valid = !descriptionErrorMessage
      return {
        descriptionErrorMessage,
        valid,
      }
    })
  }

  handleChange = (e) => {
    let {name, value, checked} = e.target
    value = name == 'completed' ? checked : value
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
    if(this.props.task)
      return this.props.updateTaskRequest(this.state)

    this.props.createTaskRequest(this.state)
    this.setState({
      description: '',
    })
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
           name={'description'}
           placeholder='Description'
           />
          <FormField
           form={this}
           name={'completed'}
           type='checkbox'
           />
          <input type='submit' value={this.props.task ? 'Update Task' : 'Create Task'}/>
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  token: state.auth.token,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  createTaskRequest,
  updateTaskRequest,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)

