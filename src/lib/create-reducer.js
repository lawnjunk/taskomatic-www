import assert from 'assert'

export const validate = (key, value, predicate) => {
  assert(predicate(value), new Error('VALIDATION_ERROR for ' + key))
}

export const createReducer = (key, initalValue=null, validator) => 
  (state=initalValue, {type, payload}) => {
    switch(type){
      case key:
        if(validator)
          validate(key, payload, validator)
        return payload
      case 'RESET':
        return initalValue
      default:
        return state
    }
}
