import { CREATE_RESUME_SUCCESS, CREATE_RESUME_ERROR } from '../types'

export const uploadResume = resume => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase()
    firebase
      .updateProfile({
        resume
      })
      .then(() => {
        dispatch({ type: CREATE_RESUME_SUCCESS, payload: {} })
      })
      .catch(error => {
        dispatch({ type: CREATE_RESUME_ERROR, payload: error })
      })
  }
}
