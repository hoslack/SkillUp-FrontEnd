import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import NavBar from './components/common/NavBar'
import { Home, Resume } from './components/pages'

const App = () => {
  return (
    <div className="">
        <Router>
          <NavBar/>
          <Switch>

            <Route path='/' exact>
              <Home/>
            </Route>

            <Route path='/resume' exact>
              <Resume/>
            </Route>

        </Switch>
        </Router>
    </div>
  )
}

export default App
