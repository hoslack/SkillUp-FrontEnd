import React from 'react'
import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Notifications } from './index'
import ResumeList from '../resumes/ResumeList'
import history from '../../history'

const Dashboard = () => {
  const resumes = useSelector(state => state.resume.resumes)
  const auth = useSelector(state => state.firebase.auth)
  if (!auth.uid) {
    history.push('/dashboard')
  }

  return (
    <div className="vh-100">
      <div className="">
        <div className="">
          <ResumeList resumes={resumes} />
        </div>
        <div className=""> </div>
        <Notifications />
      </div>
    </div>
  )
}

export default Dashboard
