import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { Menu, Button, Tooltip, Modal, message } from 'antd'
import { NotificationOutlined } from '@ant-design/icons'
import { ReviewNotifications } from '../dashboard'
import history from '../../utils/history'

const PrivateLinks = () => {
  const firebase = useFirebase()
  const profile = useSelector(state => state.firebase.profile)
  const [notificationsVisible, setNotificationsVisible] = useState(false)

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
          <Menu.Item disabled key="notifications">
            <Tooltip title="Notifications">
              <Button
                onClick={() => setNotificationsVisible(true)}
                type="primary"
                shape="circle"
                icon={<NotificationOutlined />}
              />
            </Tooltip>
          </Menu.Item>

          <Menu.Item disabled key="profile">
            <Tooltip title={profile.firstName.toUpperCase()}>
              <Button type="primary" shape="circle">
                {profile.initials}
              </Button>
            </Tooltip>
          </Menu.Item>

          <Menu.Item key="logout">
            <button style={{ all: 'unset' }} onClick={() => logOut()}>
              Log Out
            </button>
          </Menu.Item>
        </Menu>
      )}
      <Modal
        footer={false}
        width="60%"
        title="Notifications"
        visible={notificationsVisible}
        onCancel={() => setNotificationsVisible(false)}
      >
        <ReviewNotifications />
      </Modal>
    </div>
  )
}

export default PrivateLinks
