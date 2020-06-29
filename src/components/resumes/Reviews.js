import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'
import { Card } from 'antd'
import { selectReviews } from '../../utils/helpers'

const Reviews = ({ uid }) => {
  const reviewsQuery = { collection: 'reviews', orderBy: 'timestamp' }
  useFirestoreConnect(() => [reviewsQuery])
  const reviews = selectReviews(
    useSelector(({ firestore: { ordered } }) => ordered.reviews) || [],
    uid
  )

  if (reviews && reviews.length > 0) {
    return (
      <Card title="Reviews" style={{ width: 300 }}>
        {reviews.map(review => (
          <p style={{ overflowWrap: 'anywhere' }} key={review.id}>
            {review.content}
          </p>
        ))}
      </Card>
    )
  } else {
    return ''
  }
}

export default Reviews
