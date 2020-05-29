export const createAction = (type) => (payload) => {
  return {
    type, payload,
  }
}

// Network state
export const ONLINE = 'ONLINE'
export const OFFLINE = 'OFFLINE'
export const online = createAction(online)
export const offline = createAction(offline)

// auth
// async
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD'
export const signupRequest = createAction(SIGNUP_REQUEST)
export const loginRequest = createAction(LOGIN_REQUEST)
export const updatePasswordRequest = createAction(UPDATE_PASSWORD_REQUEST)

// sync
export const LOGOUT = 'LOGOUT'
export const SET_TOKEN = 'SET_TOKEN'
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR'
export const SET_UPDATE_PASSWORD_SUCCESS = 'SET_UPDATE_PASSWORD_SUCCESS'
export const logout = createAction(LOGOUT)
export const setToken = createAction(SET_TOKEN)
export const setAuthError = createAction(SET_AUTH_ERROR)
export const setUpdatePasswordSuccess = createAction(SET_UPDATE_PASSWORD_SUCCESS)


// userProfile
// async
export const FETCH_USER_PROFILE_REQUEST = 'FETCH_USER_PROFILE_REQUEST'
export const UPDATE_USER_PROFILE_REQUEST = 'UPDATE_USER_PROFILE_REQUEST'
export const fetchUserProfileRequest = createAction(FETCH_USER_PROFILE_REQUEST)
export const updateUserProfileRequest = createAction(UPDATE_USER_PROFILE_REQUEST)
// sync
export const SET_USER_PROFILE = 'SET_USER_PROFILE'
export const SET_USER_PROFILE_ERROR = 'SET_USER_PROFILE_ERROR'
export const setUserProfile = createAction(SET_USER_PROFILE)
export const setUserProfileError = createAction(SET_USER_PROFILE_ERROR)

// allProfiles
// async
export const FETCH_ALL_PROFILES_REQUEST = 'FETCH_ALL_PROFILES_REQUEST'
export const fetchAllProfilesRequest = createAction(FETCH_ALL_PROFILES_REQUEST)
//sync
export const SET_ALL_PROFILES = 'SET_ALL_PROFILES'
export const setAllProfiles= createAction(SET_ALL_PROFILES)

// tasks
// ### fetchTasks
//async 
export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST'
export const fetchTasksRequet = createAction(FETCH_TASKS_REQUEST)
// sync 
export const SET_USER_TASKS = 'SET_USER_TASKS'
export const setUserTasks = createAction(SET_USER_TASKS)

// ### createTask
//async 
export const CREATE_TASK_REQUEST = 'CREATE_TASK_REQUEST'
export const createTaskRequest= createAction(CREATE_TASK_REQUEST)
// sync
export const ADD_TASK = 'ADD_TASK'
export const addTask = createAction(ADD_TASK)

// ### updateTask
// async
export const UPDATE_TASK_REQUEST = 'UPDATE_TASK_REQUEST'
export const updateTaskRequest= createAction(UPDATE_TASK_REQUEST)
// sync
export const UPDATE_TASK = 'UPDATE_TASK'
export const updateTask = createAction(UPDATE_TASK)

