import React from 'react'
import { ResumeSummary } from './index'

const ResumeList = ({ resumes }) => {
  return (
    <div className="section project-list">
      {resumes &&
        resumes.length > 0 &&
        resumes.map(resume => {
          return <ResumeSummary key={resume.id} resume={resume} />
        })}
    </div>
  )
}
export default ResumeList
