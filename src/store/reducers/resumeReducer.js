import {
  CREATE_RESUME_SUCCESS,
  CREATE_RESUME_ERROR,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR
} from '../types'

const initialState = {
  resumeError: null,
  reviewError: null
}

const resumeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RESUME_SUCCESS:
      return {
        ...state,
        resumeError: null
      }
    case CREATE_RESUME_ERROR:
      return {
        ...state,
        resumeError: 'The Resume could not be uploaded'
      }
    case CREATE_REVIEW_SUCCESS:
      return {
        ...state
      }
    case CREATE_REVIEW_ERROR:
      return {
        ...state,
        reviewError: 'The Review could not be added'
      }
  }
  return state
}

export default resumeReducer
