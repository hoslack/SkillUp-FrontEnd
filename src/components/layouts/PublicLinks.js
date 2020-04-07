import React, { useState } from 'react'
import { Menu, Modal } from 'antd'
import Signin from '../auth/Signin'
import Signup from '../auth/Signup'

const PublicLinks = () => {
  const [visible, setVisible] = useState(false)
  const [authType, setAuthType] = useState('Sign Up')

  const handleClick = (e, type) => {
    e.preventDefault()
    setAuthType(type)
    setVisible(true)
  }

  return (
    <div>
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '64px', float: 'right' }}>
        <Menu.Item key="1">
          <button
            onClick={e => handleClick(e, 'Sign In')}
            style={{ all: 'unset' }}>
            Sign In
          </button>
        </Menu.Item>
        <Menu.Item key="2">
          <button
            onClick={e => handleClick(e, 'Sign Up')}
            style={{ all: 'unset' }}>
            Sign Up
          </button>
        </Menu.Item>
      </Menu>
      <Modal
        footer={null}
        title={authType}
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}>
        {authType === 'Sign In' ? <Signin /> : <Signup />}
      </Modal>
    </div>
  )
}

export default PublicLinks
