import types from '../types'
const getTypes = types()

const initialState = {
  authError: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case getTypes.LOGIN_ERROR:
      return {
        ...state,
        authError: action.payload.message
      }
    case getTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authError: null
      }
    case getTypes.LOGOUT_SUCCESS:
      return {
        ...state
      }
    case getTypes.SIGNUP_SUCCESS:
      console.log('Sign up Success')
      return {
        ...state,
        authError: null
      }
    case getTypes.SIGNUP_ERROR:
      console.log('Sign up Error', action.payload.message)
      return {
        ...state,
        authError: action.payload.message
      }
    default:
      return state
  }
}

export default authReducer
