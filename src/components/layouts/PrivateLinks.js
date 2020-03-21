import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOut } from '../../store/actions'

const PrivateLinks = () => {
  const dispatch = useDispatch()
  return (
    <div className="container">
      <ul className="right">
        <li>
          <NavLink to="/">New CV</NavLink>
        </li>
        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>
        <li>
          <a onClick={() => dispatch(signOut())} href="#">
            Log Out
          </a>
        </li>
        <li>
          <NavLink className="btn btn-floating pink lighten-1" to="/">
            HO
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default PrivateLinks
