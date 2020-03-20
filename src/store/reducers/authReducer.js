import { LOGIN_ERROR, LOGIN_SUCCESS } from '../types'

const initialState = {
  authError: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      console.log('Log in Error')
      return {
        ...state,
        authError: 'Could not log in'
      }
    case LOGIN_SUCCESS:
      console.log('Logged in Successfully')
      return {
        ...state,
        authError: 'null'
      }
    default:
      return state
  }
}

export default authReducer
