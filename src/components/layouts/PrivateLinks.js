import React from 'react'
import {NavLink} from 'react-router-dom'

const PrivateLinks = () => {
  return(
      <div className="container">
        <ul className="right">
          <li>
            <NavLink to='/' >New CV</NavLink>
          </li>
          <li>
            <NavLink to='/dashboard' >Dashboard</NavLink>
          </li>
          <li>
            <NavLink to='/logout' >Log out</NavLink>
          </li>
          <li>
            <NavLink className="btn btn-floating pink lighten-1" to='/' >
              HO
            </NavLink>
          </li>
        </ul>
      </div>

  )
}

export default PrivateLinks
