import {isBoolean} from '../../lib/util.js'

export default  (state=true, {type, payload}) => {
  if(!isBoolean(payload))
    throw new Error('ONLINE_ERROR payload must be boolean')
  switch(type){
    default:
      return state
  }
}
