import {combineReducers} from 'redux'

import auth from './auth-reducer.js'
import tasks from './tasks-reducer.js'
import online from './online-reducer.js'
import userProfile from './user-profile-reducer.js'
import allProfiles  from './all-profiles-reducer.js' 

export default combineReducers({
  auth,
  tasks,
  online,
  userProfile,
  allProfiles,
})
