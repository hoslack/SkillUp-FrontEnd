import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PrivateLinks from './PrivateLinks'
import PublicLinks from './PublicLinks'
import { Layout } from 'antd'
import Logo from '../../utils/icons/logo.png'

const Navbar = () => {
  const auth = useSelector(state => state.firebase.auth)
  const links = auth.uid ? <PrivateLinks /> : <PublicLinks />
  const { Header } = Layout

  return (
    <Header
      className="header"
      style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <Link className="brand-logo" to="/">
        <img className="logo" src={Logo} alt="Home" />
      </Link>
      {auth.isLoaded && links}
    </Header>
  )
}

export default Navbar
