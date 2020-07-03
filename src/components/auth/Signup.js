import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirebase } from 'react-redux-firebase'
import { Form, Input, Button, Alert, Select, message } from 'antd'
import professions from '../../utils/professions'

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
const { Option } = Select

const Signup = () => {
  const firebase = useFirebase()
  const auth = useSelector(state => state.auth)
  const authError = auth.authError
  const [error, setError] = useState('')
  const onFinish = ({
    firstName,
    lastName,
    username,
    email,
    password,
    profession
  }) => {
    return firebase
      .createUser(
        { email, password },
        {
          username,
          email,
          firstName,
          lastName,
          profession,
          resume: '',
          admin: false,
          subscription: ''
        }
      )
      .then(data => {
        message.success(`Sign Up was successful, welcome`)
      })
      .catch(err => {
        setError(err.message)
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
        style={{ paddingRight: '10%' }}
        name="basic"
        initialValues={{}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}>
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!'
            }
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!'
            }
          ]}>
          <Input />
        </Form.Item>

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
          name="profession"
          label="Profession"
          rules={[{ required: true }]}>
          <Select placeholder="Select your professional" allowClear>
            {professions.map(profession => (
              <Option key={profession} value={profession}>
                {profession}
              </Option>
            ))}
          </Select>
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

export default Signup
