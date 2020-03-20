import React from 'react'
import { Provider } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { createFirestoreInstance } from 'redux-firestore'
import Home from './components/Home'
import configureStore from './store/store'
import { firebase as fbConfig, rrfConfig } from './config/config'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Dashboard, Navbar, Resume, Signin, Signup } from './components'

const initialState = window && window.__INITIAL_STATE__ // set initial state here
const store = configureStore(initialState)
// Initialize Firebase instance
firebase.initializeApp(fbConfig)

export default function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rrfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route exact component={Home} path="/" />
              <Route exact component={Dashboard} path="/dashboard" />
              <Route exact component={Resume} path="/resume/:user_id" />
              <Route exact component={Signin} path="/signin" />
              <Route exact component={Signup} path="/signup" />
            </Switch>
          </div>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}
