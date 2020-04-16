import {
  CREATE_RESUME_SUCCESS,
  CREATE_RESUME_ERROR,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_ERROR
} from '../types'

export const uploadResume = resume => (dispatch, getState, { getFirebase }) => {
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

export const createReview = ({ content, authorId, userId }) => (
  dispatch,
  getState,
  { getFirebase }
) => {
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

export const createTag = (sender, recipient, name, type) => (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firestore = getFirebase().firestore()
  firestore
    .collection('tags')
    .add({
      sender,
      recipient,
      name,
      type,
      viewed: false
    })
    .then(() => {
      dispatch({ type: CREATE_TAG_SUCCESS, payload: {} })
    })
    .catch(error => {
      dispatch({ type: CREATE_TAG_ERROR, payload: error })
    })
}
