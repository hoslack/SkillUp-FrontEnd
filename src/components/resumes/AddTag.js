import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFirestore } from 'react-redux-firebase'
import { Button } from 'antd'
import { createTag } from '../../store/actions/resumeActions'

const AddTag = ({ uid, admin }) => {
  const [tagAdded, setTagAdded] = useState(false)
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const db = useFirestore()
  const auth = useSelector(state => state.firebase.auth)
  const profile = useSelector(state => state.firebase.profile)
  const authId = !auth.isEmpty && auth.uid
  const name = !profile.isEmpty && profile.firstName

  useEffect(() => {
    const tagsArray = []
    db.collection('tags').onSnapshot(
      snapshot => {
        snapshot.forEach(doc => {
          tagsArray.push(doc.data())
          if (doc.data().recipient === uid && doc.data().sender === authId) {
            setTagAdded(true)
          }
        })
        setTags(tagsArray)
      },
      error => {
        console.log(error)
      }
    )
  }, [db, authId, uid])

  const handleAddTag = async () => {
    await dispatch(createTag(authId, uid, name, 'Review Request'))
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }

  return !auth.isEmpty && !auth.admin && admin ? (
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
