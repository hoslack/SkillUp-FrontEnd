import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Card } from 'antd'
import { selectReviews } from '../../utils/helpers'

const Reviews = ({ uid }) => {
  useFirestoreConnect('reviews')
  const reviews = selectReviews(
    useSelector(state => state.firestore.ordered.reviews),
    uid
  )

  return (
    <Card title="Reviews" style={{ width: 300 }}>
      {reviews &&
        reviews.length > 0 &&
        reviews.map(review => <p key={review.userId}>{review.content}</p>)}
    </Card>
  )
}

export default Reviews
