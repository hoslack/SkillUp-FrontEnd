import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {LaptopOutlined, UserOutlined} from '@ant-design/icons'
import {Layout, Menu} from 'antd'
import {getLocation} from '../../utils/helpers'

const {SubMenu} = Menu
const {Sider} = Layout

const SideBar = () => {
    const location = getLocation()
    const profile = useSelector(({firebase: {profile}}) => profile)
    const [collapsed, setCollapsed] = useState(false)

    const onCollapsed = collapsed => {
        setCollapsed(collapsed)
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
            <div className="logo"/>
            <Menu theme="dark" defaultSelectedKeys={[`${location.selectedKey}-items`]} mode="inline">
                <SubMenu
                    key="dashboard-items"
                    title={
                        <span>
              <LaptopOutlined/>
                            {!collapsed && "Dashboard"}
            </span>
                    }>
                    <Menu.Item key="dashboard">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </Menu.Item>
                    <Menu.Item key="tags">
                        <NavLink to="/tags">Tags</NavLink>
                    </Menu.Item>
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
              <UserOutlined/>
                            {!collapsed && "Profile"}
            </span>
                    }>
                    <Menu.Item key="resume">
                        <NavLink to="/resume">My Resume</NavLink>
                    </Menu.Item>
                    <Menu.Item key="details">
                        <NavLink to="/details">Personal Details</NavLink>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </Sider>
    )
}

export default SideBar
