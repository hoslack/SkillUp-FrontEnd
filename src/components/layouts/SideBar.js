import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'
import { getLocation } from '../../utils/helpers'

const { SubMenu } = Menu
const { Sider } = Layout

const SideBar = () => {
  const location = getLocation()
  const profile = useSelector(({ firebase: { profile } }) => profile)

  return (
    <Sider
      width={200}
      style={{
        backgroundColor: 'white',
        marginTop: '60px',
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0
      }}>
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.openKey]}
        defaultOpenKeys={[`${location.selectedKey}-items`]}
        style={{ minHeight: '100vh', borderRight: 0 }}>
        <SubMenu
          key="dashboard-items"
          title={
            <span>
              <LaptopOutlined />
              Dashboard
            </span>
          }>
          <Menu.Item key="dashboard">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </Menu.Item>
          <Menu.Item key="tags">
            <NavLink to="/tags">Tags</NavLink>
          </Menu.Item>
          {!profile.isEmpty && !profile.admin && (
            <Menu.Item key="payment">
              <NavLink to="/payment">Payment</NavLink>
            </Menu.Item>
          )}
          {!profile.isEmpty && !profile.admin && (
            <Menu.Item key="jobs">
              <NavLink to="/jobs">Jobs</NavLink>
            </Menu.Item>
          )}
        </SubMenu>

        <SubMenu
          key="profile-items"
          title={
            <span>
              <UserOutlined />
              Profile
            </span>
          }>
          <Menu.Item key="resume">
            <NavLink to="/resume">My Resume</NavLink>
          </Menu.Item>
          <Menu.Item key="personal-details">Personal Details</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default SideBar
