import {
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_ERROR
} from '../types'

export const updateSubscription = () => {
  return (dispatch, getState, { getFirebase }) => {
    const now = new Date()
    now.setFullYear(now.getFullYear() + 1)
    const firebase = getFirebase()
    firebase
      .updateProfile({
        subscription: now.toDateString()
      })
      .then(() => {
        dispatch({ type: CREATE_SUBSCRIPTION_SUCCESS, payload: {} })
      })
      .catch(error => {
        dispatch({ type: CREATE_SUBSCRIPTION_ERROR, payload: error })
      })
  }
}
