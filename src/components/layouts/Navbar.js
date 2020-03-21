import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PrivateLinks, PublicLinks } from './index'

const Navbar = () => {
  const auth = useSelector(state => state.firebase.auth)
  const authIsLoaded = auth && auth.isLoaded

  console.log(auth, 'FIREBASE')
  const links = auth.uid ? <PrivateLinks /> : <PublicLinks />
  return (
    <nav className="nav-wrapper grey darken-3">
      <div className="container">
        <Link className="brand-logo" to="/">
          Home
        </Link>
        {authIsLoaded && links}
      </div>
    </nav>
  )
}

export default Navbar
