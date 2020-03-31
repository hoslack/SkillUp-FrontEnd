import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOut } from '../../store/actions'
import { Menu } from 'antd'

const PrivateLinks = () => {
  const dispatch = useDispatch()
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      style={{ lineHeight: '64px', float: 'right' }}>
      <Menu.Item key="1">
        <NavLink to="/resume">Resume</NavLink>
      </Menu.Item>

      <Menu.Item key="2">
        <NavLink to="/dashboard">Dashboard</NavLink>
      </Menu.Item>

      <Menu.Item key="3">
        <button style={{ all: 'unset' }} onClick={() => dispatch(signOut())}>
          Log Out
        </button>
      </Menu.Item>
      <Menu.Item key="4">HO</Menu.Item>
    </Menu>
  )
}

export default PrivateLinks
