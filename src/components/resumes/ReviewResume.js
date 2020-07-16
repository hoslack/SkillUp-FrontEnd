import React, { useEffect, useState } from 'react'
import PDFViewer from 'pdf-viewer-reactjs'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import {
  PageHeader,
  Row,
  Col,
  Descriptions,
  Button,
  Modal,
  Input,
  Form,
  Result,
  message,
  Badge
} from 'antd'
import Loader from '../common/Loader'
import Reviews from './Reviews'
import AddTag from './AddTag'
import AddJobs from './AddJobs'

const ReviewResume = ({ match: { params } }) => {
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const [reviewError, setReviewError] = useState(false)
  const firestore = useFirestore()
  const [userData, setUserData] = useState({})
  const [visible, setVisible] = useState(false)
  const [jobsVisible, setJobsVisible] = useState(false)
  const [reviewSuccess, setReviewSuccess] = useState(false)
  const uid = params.uid || ''
  const userSubscription =
    profile.subscription === '' ? '' : new Date(profile.subscription)
  const subscribed = userSubscription > new Date()

  useEffect(() => {
    firestore
      .collection('users')
      .doc(uid)
      .get()
      .then(result => {
        setUserData(result.data())
      })
      .catch(() => message.error('There was and error fetching The resume'))
  }, [firestore, uid])

  const handleSubmitReview = ({ review }) => {
    firestore
      .collection('reviews')
      .add({
        authorEmail: profile.email,
        content: review,
        userId: uid,
        authorId: auth.uid || '',
        timestamp: Date.now()
      })
      .then(() => {
        setReviewSuccess(true)
        firestore
          .collection('notifications')
          .add({
            type: 'review',
            viewed: false,
            recipient: uid,
            reviewer: profile.firstName,
            timestamp: Date.now()
          })
          .then(() => {})
          .catch(() => message.error('There was an error adding the Review'))
      })
      .catch(() => {
        setReviewSuccess(false)
        setReviewError(true)
      })
  }

  return (
    <div className="">
      <Modal
        width="70%"
        title="Available Jobs"
        okText="Done"
        visible={jobsVisible}
        onCancel={() => setJobsVisible(false)}>
        <AddJobs
          profession={userData.profession}
          uid={uid}
          reviewerName={profile.firstName}
        />
      </Modal>
      {userData && userData.resume ? (
        <div>
          <PageHeader
            style={{ marginBottom: '50px' }}
            ghost={false}
            onBack={() => window.history.back()}
            title={userData.firstName}
            subTitle={userData.lastName}
            extra={[
              !profile.isEmpty && profile.admin && (
                <Button
                  key="1"
                  type="primary"
                  onClick={() => {
                    setVisible(true)
                  }}>
                  Add Review
                </Button>
              ),
              !profile.isEmpty && profile.admin && (
                <Button
                  key="2"
                  type="primary"
                  onClick={() => {
                    setJobsVisible(true)
                  }}>
                  View Jobs
                </Button>
              ),
              subscribed && !auth.admin && (
                <AddTag
                  key="3"
                  uid={uid}
                  reviewerName={userData.firstName}
                  admin={userData && userData.admin}
                />
              )
            ]}>
            <Descriptions size="small" column={2}>
              <Descriptions.Item label="Profession">
                {userData.profession}
              </Descriptions.Item>
              {userData.admin && userData.votes && (
                <Descriptions.Item label="Upvotes">
                  <Badge
                    className="site-badge-count-109"
                    count={userData.votes || 0}
                    overflowCount={999}
                    style={{ backgroundColor: '#1890ff' }}
                  />
                </Descriptions.Item>
              )}
            </Descriptions>
          </PageHeader>

          <Row>
            <Col span={18}>
              <PDFViewer
                css={{ padding: '1px', width: '300px' }}
                hideNavbar
                canvasCss={{}}
                navbarOnTop
                hideRotation
                page={1}
                scale={1.4}
                scaleStep={0.1}
                maxScale={1.5}
                minScale={1}
                document={{
                  base64: userData.resume
                }}
              />
            </Col>

            <Col span={6}>
              <Reviews uid={uid} />
            </Col>
          </Row>
          <Modal
            footer={false}
            title="Add Review"
            okText="Submit"
            visible={visible}
            onCancel={() => setVisible(false)}>
            {reviewSuccess ? (
              <Result
                status="success"
                title="Successfully Added a Review!"
                extra={[
                  <Button
                    key="another"
                    onClick={() => {
                      setReviewSuccess(false)
                      setVisible(true)
                    }}>
                    Add Another
                  </Button>,
                  <Button
                    type="primary"
                    key="done"
                    onClick={() => {
                      setVisible(false)
                      setReviewSuccess(false)
                    }}>
                    I'm Done
                  </Button>
                ]}
              />
            ) : reviewError ? (
              <Result status="error" title="An error Occurred" />
            ) : (
              <Form
                onFinish={handleSubmitReview}
                style={{ paddingRight: '20%' }}>
                <Form.Item
                  name="review"
                  label="Review"
                  rules={[{ required: true }]}>
                  <Input.TextArea />
                </Form.Item>
                <Form.Item
                  {...{
                    wrapperCol: {
                      offset: 16,
                      span: 16
                    }
                  }}>
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            )}
          </Modal>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  )
}

export default ReviewResume
