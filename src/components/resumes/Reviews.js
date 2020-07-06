import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { Button, Card, Form, Input, message, Modal, Result } from 'antd'
import { selectReviews } from '../../utils/helpers'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'

const Reviews = ({ uid }) => {
  const reviewsQuery = {
    collection: 'reviews',
    orderBy: ['timestamp', 'desc']
  }
  useFirestoreConnect(() => [reviewsQuery])
  const firestore = useFirestore()
  const { useForm } = Form
  const [form] = useForm()
  const [currentId, setCurrentID] = useState('')
  const [visible, setVisible] = useState(false)
  const [reviewSuccess, setReviewSuccess] = useState(false)
  const [reviewError, setReviewError] = useState(false)
  const [currentContent, setCurrentContent] = useState('')

  useEffect(() => {
    form.setFieldsValue({ review: currentContent })
  }, [form, currentContent])

  const reviews = selectReviews(
    useSelector(({ firestore: { ordered } }) => ordered.reviews) || [],
    uid
  )
  const profile = useSelector(({ firebase: { profile } }) => profile)


  const deleteReview = id => {
    firestore
      .delete(`reviews/${id}`)
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
          setCurrentContent('')
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
          height: '400px',
          overflowY: 'scroll',
          borderRadius: '10px'
        }}
        loading={reviews.length < 0}>
        {reviews.map(review => (
          <article
            key={review.id}
            className="center mw5 mw6-ns br3 hidden ba b--black-10 mb4 shadow-1">
            <div className="bg-near-white br3 br--top mv0 pv2 ph3 flex justify-between">
              <h1 className="f6 black-60 w-50 truncate-ns">
                {review.authorEmail}
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
            </div>
            <div className="pa2 bt b--black-10">
              <p className="measure">{review.content}</p>
            </div>
          </article>
        ))}
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
              setFieldValue={{ review: currentContent }}
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
