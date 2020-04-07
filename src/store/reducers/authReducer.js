import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  SIGNUP_ERROR
} from '../types'

const initialState = {
  authError: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      return {
        ...state,
        authError: action.payload.message
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null
      }
    case LOGOUT_SUCCESS:
      return {
        ...state
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        authError: null
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        authError: action.payload.message
      }
    default:
      return state
  }
}

export default authReducer
