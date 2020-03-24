import React from 'react'
import 'antd/dist/antd.css'
import { Layout } from 'antd'
import { Navbar, SideBar, Home } from './index'
import { Dashboard } from './dashboard'
import { Resume } from './resumes'
import { Signin, Signup } from './auth'
import { Switch, Route } from 'react-router-dom'

const { Content } = Layout

const Page = () => {
  return (
    <Layout>
      <Navbar />
      <Layout>
        <SideBar />
        <Content className="site-layout-content" style={{ marginLeft: 200 }}>
          <Switch>
            <Route exact component={Home} path="/" />
            <Route exact component={Dashboard} path="/dashboard" />
            <Route exact component={Resume} path="/resume/:user_id" />
            <Route exact component={Signin} path="/signin" />
            <Route exact component={Signup} path="/signup" />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Page
