import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { signUp } from '../../store/actions'
import Loader from '../common/Loader'

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
const Signup = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const onFinish = ({ firstName, lastName, username, email, password }) => {
    dispatch(signUp({ firstName, lastName, username, email, password }))
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  if (auth.uid) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="vh-100 pt6 pr5">
      {!auth.isLoaded ? (
        <Form
          {...layout}
          style={{ paddingRight: '50%' }}
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
                message: 'Please input your email!'
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
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default Signup
