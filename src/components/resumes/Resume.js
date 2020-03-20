import React from 'react'

const Resume = (props) => {
  const id = props.match.params.id
  return (
    <div className="resume-detail section container">
      <div className="row">
        <div className="">
          Resume comments
        </div>
        <div className="">
          Resume File - {id}
        </div>
      </div>
    </div>
  )
}

export default Resume
