import history from '../../utils/history'
import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_ERROR
} from '../types'

export const signUp = ({
  firstName,
  lastName,
  username,
  email,
  password,
  profession
}) => {
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
          profession,
          resume: '',
          admin: false
        }
      )
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS, payload: {} })
        history.push('/dashboard')
      })
      .catch(error => {
        dispatch({ type: SIGNUP_ERROR, payload: error })
      })
  }
}

export const signIn = ({ email, password }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .login({ email, password })
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS, payload: {} })
        history.push('/dashboard')
      })
      .catch(err => {
        dispatch({ type: LOGIN_ERROR, payload: err })
      })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .logout()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS, payload: {} })
        history.push('/')
      })
      .catch(() => {
        dispatch({ type: LOGOUT_ERROR })
      })
  }
}

