/* eslint react/prop-types: 0 */
import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './layouts/Navbar'
import SideBar from './layouts/SideBar'
import Home from './Home'
import Dashboard from './dashboard/Dashboard'
import Resume from './resumes/Resume'
import { Signin, Signup } from './auth'
import Loader from './common/Loader'
import history from '../history'

const { Content } = Layout

const Page = props => {
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const firebase = props.firebase
  return (
    <BrowserRouter history={history}>
      <Layout>
        <Navbar />
        {auth.uid ? (
          <Layout>
            <SideBar />
            {profile.isLoaded && auth.uid ? (
              <Content
                className="site-layout-content"
                style={{ marginLeft: 200 }}>
                <Switch>
                  <Route exact component={Dashboard} path="/dashboard" />
                  <Route
                    exact
                    component={() => <Resume firebase={firebase} />}
                    path="/resume"
                  />
                </Switch>
              </Content>
            ) : (
              <Loader />
            )}
          </Layout>
        ) : (
          <Switch>
            <Route exact component={Home} path="/" />
            <Route exact component={Signin} path="/signin" />
            <Route exact component={Signup} path="/signup" />
          </Switch>
        )}
      </Layout>
    </BrowserRouter>
  )
}

export default Page
