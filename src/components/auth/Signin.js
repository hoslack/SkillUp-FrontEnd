import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Input, Button } from 'antd'
import { signIn } from '../../store/actions/authActions'
import history from '../../history'
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

const Signin = () => {
  const auth = useSelector(state => state.auth)
  const authError = auth.authError
  const dispatch = useDispatch()

  const onFinish = ({ email, password }) => {
    dispatch(signIn({ email, password }))
    history.push('/dashboard')
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  if (auth.uid) {
    history.push('/dashboard')
  }
  return auth.uid ? (
    history.push('/dashboard')
  ) : (
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

export default Signin
