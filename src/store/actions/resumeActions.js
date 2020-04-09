import {
  CREATE_RESUME_SUCCESS,
  CREATE_RESUME_ERROR,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR
} from '../types'

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

export const createReview = ({ content, authorId, userId }) => {
  return (dispatch, getState, { getFirebase }) => {
    const firestore = getFirebase().firestore()
    firestore
      .collection('reviews')
      .add({
        content,
        authorId,
        userId
      })
      .then(() => {
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: {} })
      })
      .catch(error => {
        dispatch({ type: CREATE_REVIEW_ERROR, payload: error })
      })
  }
}
