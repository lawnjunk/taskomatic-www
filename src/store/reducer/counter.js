import {INC, DEC} from '../action'
import {isEmpty, isNumber} from '../../lib/predicate.js'

export default (state=0, action) => {
  let {type, payload} = action
  if (!isEmpty(payload) && !isNumber(payload)) 
      throw new Error('bad payload')
  console.log('WAT', action)
  switch(type){
    case INC:
      return state + (payload ? payload : 1)
    case DEC:
      return state - (payload ? payload : 1)
    default:
      return state
  }
}
