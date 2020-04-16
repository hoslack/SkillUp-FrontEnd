import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { Switch, Route, Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './layouts/Navbar'
import SideBar from './layouts/SideBar'
import Home from './Home'
import { Dashboard, Tags } from './dashboard'
import Resume from './resumes/Resume'
import ReviewResume from './resumes/ReviewResume'
import history from '../utils/history'

const { Content } = Layout

const Page = props => {
  const profile = useSelector(state => state.firebase.profile)
  const firebase = props.firebase
  return (
    <Router history={history}>
      {!profile.isEmpty ? (
        <Layout>
          <Navbar />
          <Layout>
            <SideBar />
            <Content
              className="site-layout-content"
              style={{ marginLeft: 200 }}>
              <Switch>
                <Route exact component={Dashboard} path="/dashboard" />
                <Route exact component={Tags} path="/tags" />
                <Route exact component={ReviewResume} path="/review/:uid" />
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
