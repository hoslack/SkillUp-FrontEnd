import React from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { Menu, Button, Tooltip, message } from 'antd'
import history from '../../utils/history'

const PrivateLinks = () => {
  const firebase = useFirebase()
  const profile = useSelector(state => state.firebase.profile)

  const logOut = () => {
    firebase
      .logout()
      .then(() => {
        history.push('/')
        return message.success('You have been logged out successfully')
      })
      .catch(error => message.error(`${error.message}`))
  }

  return (
    <div>
      {!profile.isEmpty && (
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
                {profile.initials}
              </Button>
            </Tooltip>
          </Menu.Item>
          <Menu.Item key="2">
            <button style={{ all: 'unset' }} onClick={() => logOut()}>
              Log Out
            </button>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

export default PrivateLinks
