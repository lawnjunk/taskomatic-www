import {ONLINE, OFFLINE} from '../action'

export default (state=true, {type, payload}) => {
  switch(type){
    case ONLINE:
      return true
    case OFFLINE:
      return false
    default:
      return state
  }
}
