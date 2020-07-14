import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { Switch, Route, Router } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './layouts/Navbar'
import SideBar from './layouts/SideBar'
import Home from './Home'
import { Dashboard, Tags, Payment, Jobs, ReviewerPayments } from './dashboard'
import { Profile } from './auth'
import Resume from './resumes/Resume'
import ReviewResume from './resumes/ReviewResume'
import history from '../utils/history'

const { Content } = Layout

const Page = () => {
  const profile = useSelector(state => state.firebase.profile)
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
                <Route exact component={Jobs} path="/jobs" />
                <Route exact component={Payment} path="/payment" />
                <Route exact component={ReviewResume} path="/review/:uid" />
                <Route exact component={Profile} path="/details" />
                <Route exact component={Resume} path="/resume" />
                <Route
                  exact
                  component={ReviewerPayments}
                  path="/reviewer-payments"
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
