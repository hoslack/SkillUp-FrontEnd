import { CREATE_RESUME } from '../types'

export const createResume = resume => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: CREATE_RESUME, resume })
  }
}
