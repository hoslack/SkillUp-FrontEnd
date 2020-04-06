import { CREATE_RESUME_SUCCESS, CREATE_RESUME_ERROR } from '../types'

const initialState = {
  resumes: [
    { id: 1, title: 'First Title', description: 'First Desc' },
    { id: 2, title: 'Second Title', description: 'Second Desc' },
    { id: 3, title: 'Third Title', description: 'Third Desc' }
  ],
  resumeError: null
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
  }
  return state
}

export default resumeReducer
