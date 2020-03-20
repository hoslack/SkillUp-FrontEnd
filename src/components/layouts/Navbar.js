import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {PrivateLinks, PublicLinks} from './index'

const Navbar = () => {
  const firebase = useSelector(state => state.firebase)
  console.log(firebase, "FIREBASE")
  return(
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link className="brand-logo" to='/' >Home</Link>
        <PrivateLinks/>
        <PublicLinks/>
      </div>
    </nav>
  )
}

export default Navbar
