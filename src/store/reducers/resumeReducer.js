import {
  CREATE_RESUME_SUCCESS,
  CREATE_RESUME_ERROR,
  CREATE_REVIEW_SUCCESS,
  CREATE_REVIEW_ERROR,
  CREATE_TAG_SUCCESS,
  CREATE_TAG_ERROR
} from '../types'

const initialState = {
  resumeError: null,
  reviewError: null,
  tagError: null,
  tagState: null,
  tags: []
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
    case CREATE_TAG_SUCCESS:
      return {
        ...state,
        tagState: 200
      }
    case CREATE_TAG_ERROR:
      return {
        ...state,
        tagError: 'There was an error creating the Tag'
      }
    default:
      return {
        ...state
      }
  }
}

export default resumeReducer
