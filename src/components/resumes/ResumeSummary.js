import React from 'react'

const ResumeSummary = ({resume}) => {
  return (
    <div className="card z-depth-0 project-summary">
      <div className="card-content grey-text text-darken-3">
        <span className="card-title">{resume && resume.title}</span>
        <p>{resume && resume.description}</p>
        <p className="grey-text">date</p>
      </div>
    </div>
  )
}

export default ResumeSummary
