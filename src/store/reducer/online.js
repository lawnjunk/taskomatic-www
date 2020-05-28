import {isBoolean} from '../../lib/predicate.js'

export default  (state=true, {type, payload}) => {
  if(!isBoolean(payload))
    throw new Error('ONLINE_ERROR payload must be boolean')
  switch(type){
    default:
      return state
  }
}
