import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { Switch, Route, Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './layouts/Navbar'
import SideBar from './layouts/SideBar'
import Home from './Home'
import Dashboard from './dashboard/Dashboard'
import Resume from './resumes/Resume'
import history from '../history'

const { Content } = Layout

const Page = props => {
  const auth = useSelector(state => state.firebase.auth)
  const firebase = props.firebase
  console.log(history)
  return (
    <Router history={history}>
      {auth.uid ? (
        <Layout>
          <Navbar />
          <Layout>
            <SideBar />
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
          </Layout>
        </Layout>
      ) : (
        <Switch>
          <Route exact component={Home} path="/" />
        </Switch>
      )}
    </Router>
  )
}

export default Page
