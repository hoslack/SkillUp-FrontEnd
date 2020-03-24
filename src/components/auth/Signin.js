import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Input, Button } from 'antd'
import { signIn } from '../../store/actions/authActions'

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
  const authError = useSelector(state => state.auth.authError)
  const dispatch = useDispatch()

  const onFinish = ({ email, password }) => {
    dispatch(signIn({ email, password }))
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <Form
      {...layout}
      style={{ paddingRight: '50%' }}
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
  )
}

export default Signin
