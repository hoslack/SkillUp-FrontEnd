import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'

const PublicLinks = () => {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px', float: 'right' }}>
      <Menu.Item key="1">
        <NavLink to="/signin">Sign In</NavLink>
      </Menu.Item>
      <Menu.Item key="2">
        <NavLink to="/signup">Sign Up</NavLink>
      </Menu.Item>
    </Menu>
  )
}

export default PublicLinks
