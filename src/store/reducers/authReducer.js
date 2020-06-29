import {
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_ERROR
} from '../types'

const initialState = {
  authError: null,
  subscriptionError: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
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
