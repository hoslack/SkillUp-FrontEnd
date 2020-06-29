import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Alert, message } from 'antd'
import { useFirebase } from 'react-redux-firebase'
import history from '../../utils/history'

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
}

const Signin = () => {
  const firebase = useFirebase()
  const auth = useSelector(state => state.auth)
  const authError = auth.authError
  const [error, setError] = useState('')

  const onFinish = ({ email, password }) => {
    return firebase
      .login({ email, password })
      .then(data => {
        message.success(`Sign In was successful, welcome`)
      })
      .catch(error => {
        setError(error.message)
        message.error(`${error.message}`)
      })
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="">
      {authError && (
        <Alert
          style={{ marginBottom: '20px' }}
          message="Error"
          description={authError}
          type="error"
          showIcon
        />
      )}
      <Form
        {...layout}
        style={{ paddingRight: '20%' }}
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
              type: 'email'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!'
            }
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Signin
