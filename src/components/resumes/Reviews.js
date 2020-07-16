import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Result,
  Badge,
  Tooltip
} from 'antd'
import { DeleteTwoTone, EditTwoTone, UpOutlined } from '@ant-design/icons'
import { selectReviews } from '../../utils/helpers'

const Reviews = ({ uid }) => {
  const reviewsQuery = {
    collection: 'reviews',
    orderBy: ['timestamp', 'asc']
  }
  useFirestoreConnect(() => [reviewsQuery])
  const firestore = useFirestore()
  const [form] = Form.useForm()
  const [currentId, setCurrentID] = useState('')
  const [visible, setVisible] = useState(false)
  const [reviewSuccess, setReviewSuccess] = useState(false)
  const [reviewError, setReviewError] = useState(false)
  const [currentContent, setCurrentContent] = useState('')
  const profile = useSelector(({ firebase: { profile } }) => profile)

  useEffect(() => {
    form.setFieldsValue({ review: currentContent })
  }, [form, currentContent])

  const reviews = selectReviews(
    useSelector(({ firestore: { ordered } }) => ordered.reviews) || [],
    uid
  )
  const upVote = (reviewId, authorId) => {
    firestore
      .update(`reviews/${reviewId}`, {
        voters: firestore.FieldValue.arrayUnion(profile.email || '')
      })
      .then(() => {
        firestore
          .update(`users/${authorId}`, {
            votes: firestore.FieldValue.increment(1)
          })
          .then(() => message.success('Vote Successful'))
          .catch(error => message.error(error.message))
      })
      .catch(error => message.error(error.message))
  }

  const deleteReview = id => {
    firestore
      .delete(`reviews/${id}`)
      .then(() => message.success('Deleted'))
      .catch(() => message.error('There was a problem deleting the review'))
  }

  const handleUpdateReview = ({ review }) => {
    firestore
      .update(`reviews/${currentId}`, {
        content: review
      })
      .then(() => {
        setReviewSuccess(true)
        setTimeout(() => {
          setVisible(false)
        }, 2000)
      })
      .catch(() => {
        setReviewSuccess(false)
        setReviewError(true)
      })
  }

  if (reviews.length > 0) {
    return (
      <Card
        title="Reviews"
        style={{
          width: 300,
          height: '500px',
          overflowY: 'scroll',
          borderRadius: '10px'
        }}
        loading={reviews.length < 0}>
        {reviews.map(review => {
          const userVoted =
            Array.isArray(review.voters) &&
            review.voters.includes(profile.email)
          return (
            <article
              key={review.id}
              className="center mw5 mw6-ns br3 hidden ba b--black-10 mb4 shadow-1">
              <div className="bg-near-white br3 br--top mv0 pv2 ph3 flex justify-between">
                <h1 className="f6 black-60 w-50 truncate-ns">
                  <a href={`/review/${review.authorId}`}>
                    {review.authorEmail}
                  </a>
                </h1>
                {!profile.isEmpty && profile.email === review.authorEmail && (
                  <span>
                    <button
                      onClick={() => {
                        setCurrentContent(review.content)
                        setVisible(true)
                        setCurrentID(review.id)
                      }}
                      className="dim ba bw1 mr1 b--blue br2 shadow-1 outline-0">
                      <EditTwoTone />
                    </button>
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="dim ba bw1 b--red br2 shadow-1 outline-0">
                      <DeleteTwoTone twoToneColor="red" />
                    </button>
                  </span>
                )}
                {!profile.isEmpty &&
                  !profile.admin &&
                  profile.email !== review.authorEmail && (
                    <span>
                      <Tooltip title={userVoted ? 'You voted' : 'up vote'}>
                        <button
                          onClick={() => upVote(review.id, review.authorId)}
                          disabled={userVoted}
                          className="dim ba bw1 mr1 b--blue br2 shadow-1 outline-0">
                          <UpOutlined />
                        </button>
                      </Tooltip>
                      <Badge
                        style={{ backgroundColor: '#1890ff' }}
                        overflowCount={999}
                        count={(review.voters && review.voters.length) || 0}
                        offset={[8, -20]}>
                        <a href="#" className="head-example" />
                      </Badge>
                    </span>
                  )}
              </div>
              <div className="pa2 bt b--black-10">
                <p className="measure">{review.content}</p>
              </div>
            </article>
          )
        })}
        <Modal
          footer={false}
          title="Edit Review"
          okText="Submit"
          visible={visible}
          onCancel={() => {
            setVisible(false)
          }}>
          {reviewSuccess ? (
            <Result
              status="success"
              title="Successfully Edited the Review!"
              extra={[
                <Button
                  type="primary"
                  key="done"
                  onClick={() => {
                    setVisible(false)
                    setReviewSuccess(false)
                  }}>
                  Done
                </Button>
              ]}
            />
          ) : reviewError ? (
            <Result status="error" title="An error Occurred" />
          ) : (
            <Form
              form={form}
              onFinish={handleUpdateReview}
              style={{ paddingRight: '20%' }}>
              <Form.Item
                name="review"
                label="Review"
                rules={[{ required: true }]}>
                <Input.TextArea style={{ height: '120px' }} />
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
      </Card>
    )
  } else {
    return ''
  }
}

export default Reviews
