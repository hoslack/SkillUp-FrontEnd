const initialState = {
  resumes: [
    { id: 1, title: 'First Title', description: 'First Desc' },
    { id: 2, title: 'Second Title', description: 'Second Desc' },
    { id: 3, title: 'Third Title', description: 'Third Desc' }
  ]
}

const resumeReducer = (state = initialState, action) => {
  return state
}

export default resumeReducer
