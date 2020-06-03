import React from 'react'

const FormField = ({name, placeholder, form, type='text'}) => {
  let showWarning = !!(form.state.formSumbitted || form.state[name + 'Dirty'])
  console.log({showWarning, name})
  return (
    <div className='field'>
      <div className='warning'>
        {showWarning ? form.state[name + 'ErrorMessage'] : undefined}
      </div>
      <input 
        name={name}
        type={type}
        placeholder={placeholder}
        value={form.state[name]}
        onChange={form.handleChange}
        />
    </div>
  )
}

export default FormField
