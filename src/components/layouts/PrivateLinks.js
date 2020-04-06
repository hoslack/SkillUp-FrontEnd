import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signOut } from '../../store/actions'
import { Menu, Button, Tooltip } from 'antd'

const PrivateLinks = () => {
  const dispatch = useDispatch()
  const profile = useSelector(state => state.firebase.profile)
  return (
    <div>
      {profile.isLoaded && (
        <Menu
          theme="dark"
          mode="horizontal"
          style={{
            lineHeight: '64px',
            float: 'right',
            backgroundColor: 'transparent'
          }}>
          <Menu.Item disabled key="1">
            <Tooltip title={profile.firstName.toUpperCase()}>
              <Button type="primary" shape="circle">
                {profile.initials.toUpperCase()}
              </Button>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="2">
            <button
              style={{ all: 'unset' }}
              onClick={() => dispatch(signOut())}>
              Log Out
            </button>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

export default PrivateLinks
