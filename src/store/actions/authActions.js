import types from '../types'
import history from '../../history'
const getTypes = types()

export const signUp = ({ firstName, lastName, username, email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .createUser(
        { email, password },
        {
          username,
          email,
          firstName,
          lastName,
          resume: '',
          admin: false,
          profession: ''
        }
      )
      .then(() => {
        dispatch({ type: getTypes.SIGNUP_SUCCESS, payload: {} })
      })
      .catch(error => {
        dispatch({ type: getTypes.SIGNUP_ERROR, payload: error })
      })
  }
}

export const signIn = ({ email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .login({ email, password })
      .then(() => {
        dispatch({ type: getTypes.LOGIN_SUCCESS, payload: {} })
        history.push('/dashboard')
      })
      .catch(err => {
        dispatch({ type: getTypes.LOGIN_ERROR, payload: err })
      })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .logout()
      .then(() => {
        dispatch({ type: getTypes.LOGOUT_SUCCESS, payload: {} })
        history.push('/')
      })
      .catch(() => {
        dispatch({ type: getTypes.LOGOUT_ERROR })
      })
  }
}
