import {
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  SIGNUP_ERROR,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_ERROR
} from '../types'

const initialState = {
  authError: null,
  subscriptionError: null
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
    case CREATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state
      }
    case CREATE_SUBSCRIPTION_ERROR:
      return {
        ...state,
        subscriptionError: action.payload.message
      }
    default:
      return state
  }
}

export default authReducer
