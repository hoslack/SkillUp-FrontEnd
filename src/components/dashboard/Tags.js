import React from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

const Tags = () => {
  useFirestoreConnect('tags')
  const tags = useSelector(state => state.firestore.ordered.tags)
  console.log(tags)

  return <div>Tags</div>
}

export default Tags
