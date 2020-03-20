import { LOGIN_ERROR, LOGIN_SUCCESS } from '../types'

export const signIn = ({ email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .login({ email, password })
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS, payload: '' })
      })
      .catch(err => {
        dispatch({ type: LOGIN_ERROR, payload: err })
      })
  }
}
