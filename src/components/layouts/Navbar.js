import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PrivateLinks from './PrivateLinks'
import PublicLinks from './PublicLinks'
import { Layout } from 'antd'
import Logo from '../../utils/icons/logo.png'

const Navbar = () => {
  const profile = useSelector(state => state.firebase.profile)
  const links = !profile.isEmpty ? <PrivateLinks /> : <PublicLinks />
  const { Header } = Layout

  return (
    <Header
      className="header"
      style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <img className="logo" src={Logo} alt="Home" />
      {profile.isLoaded && links}
    </Header>
  )
}

export default Navbar
