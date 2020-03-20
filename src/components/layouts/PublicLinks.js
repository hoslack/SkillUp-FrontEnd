import React from 'react'
import {NavLink} from 'react-router-dom'

const PublicLinks = () => {
  return(
    <div className="container">
      <ul className="right">
        <li>
          <NavLink to='/signin' >Sign In</NavLink>
        </li>
        <li>
          <NavLink to='/signup' >Sign Up</NavLink>
        </li>
      </ul>
    </div>

  )
}

export default PublicLinks
