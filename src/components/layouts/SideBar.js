import React from 'react'
import { Layout, Menu } from 'antd'
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined
} from '@ant-design/icons'
import { NavLink } from 'react-router-dom'

const { SubMenu } = Menu
const { Sider } = Layout

const SideBar = () => {
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
        defaultSelectedKeys={['dashboard']}
        defaultOpenKeys={['dashboard-items']}
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
        </SubMenu>
        <SubMenu
          key="profile"
          title={
            <span>
              <UserOutlined />
              Profile
            </span>
          }>
          <Menu.Item key="my-resume">
            <NavLink to="/resume">My Resume</NavLink>
          </Menu.Item>
          <Menu.Item key="personal-details">Personal Details</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <NotificationOutlined />
              Notifications
            </span>
          }>
          <Menu.Item key="4">option9</Menu.Item>
          <Menu.Item key="5">option10</Menu.Item>
          <Menu.Item key="6">option11</Menu.Item>
          <Menu.Item key="7">option12</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  )
}

export default SideBar
