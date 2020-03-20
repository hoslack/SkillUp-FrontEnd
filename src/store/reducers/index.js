import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore'
import { firebaseReducer } from 'react-redux-firebase'
import authReducer from './authReducer'
import resumeReducer from './resumeReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  resume: resumeReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
})

export default rootReducer
