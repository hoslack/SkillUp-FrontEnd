import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { Button, message } from 'antd'

const AddTag = ({ uid, admin }) => {
  const tagQuery = {
    collection: 'tags'
  }

  useFirestoreConnect(() => [tagQuery])
  const firestore = useFirestore()
  const [tagAdded, setTagAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const authId = !auth.isEmpty && auth.uid
  const name = !profile.isEmpty && profile.firstName
  const resumePresent = !!profile.resume

  const tags = useSelector(({ firestore: { ordered } }) => ordered.tags) || []

  useEffect(() => {
    tags.map(doc => {
      if (
        doc.recipient === uid &&
        doc.sender === authId &&
        doc.type === 'Review Request'
      ) {
        setTagAdded(true)
      }
    })
  }, [firestore, authId, uid, tags])

  const handleAddTag = () => {
    firestore
      .collection('tags')
      .add({
        sender: authId,
        recipient: uid,
        name,
        type: 'Review Request',
        viewed: false,
        url: ''
      })
      .then(() => {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
        }, 3000)
      })
      .catch(error => message.error(`${error.message}`))
  }

  return !auth.isEmpty && !auth.admin && admin && resumePresent ? (
    <Button
      loading={loading}
      disabled={tagAdded}
      type="primary"
      onClick={() => {
        handleAddTag()
      }}>
      {tagAdded ? 'Tagged' : 'Tag'}
    </Button>
  ) : (
    ''
  )
}

export default AddTag
