import React, { useEffect, useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Table } from 'antd'

const Tags = () => {
  const [tags, setTags] = useState([])
  const db = useFirestore()
  const auth = useSelector(state => state.firebase.auth)
  const authId = !auth.isEmpty && auth.uid

  useEffect(() => {
    const tagsArray = []
    db.collection('tags').onSnapshot(
      snapshot => {
        snapshot.forEach(doc => {
          if (doc.data().recipient === authId) {
            tagsArray.push(doc.data())
          }
        })
        setTags(tagsArray)
      },
      error => {
        console.log(error)
      }
    )
  }, [db, authId])

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'View',
      dataIndex: 'sender',
      key: 'sender',
      render: text => <a href={`/review/${text}`}>Review Resume</a>
    }
  ]

  return (
    <div className="vh-100">
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={tags || []}
        pagination={{ position: ['', 'bottomCenter'], simple: true }}
      />
    </div>
  )
}

export default Tags
