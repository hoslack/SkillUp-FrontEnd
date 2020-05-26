import history from '../../utils/history'
import {
  SIGNUP_ERROR,
  SIGNUP_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_ERROR,
  CREATE_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_ERROR
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
          admin: false,
          subscription: ''
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
