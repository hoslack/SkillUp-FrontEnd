import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Notifications } from './index'
import ResumeList from '../resumes/ResumeList'

const Dashboard = () => {
  const resumes = useSelector(state => state.resume.resumes)
  const auth = useSelector(state => state.firebase.auth)
  if (!auth.uid) return <Redirect to="/" />

  return (
    <div className="dashboard container">
      <div className="row">
        <div className="col s12 m6">
          <ResumeList resumes={resumes} />
        </div>
        <div className="col s12 m5 offset-m1"> </div>
        <Notifications />
      </div>
    </div>
  )
}

export default Dashboard
