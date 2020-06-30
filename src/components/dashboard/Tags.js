import React from 'react'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Table, Alert } from 'antd'

const Tags = () => {
  const tagsQuery = {
    collection: 'tags',
    orderBy: 'timestamp'
  }

  useFirestoreConnect(() => [tagsQuery])

  const auth = useSelector(({ firebase: { auth } }) => auth)
  const profile = useSelector(({ firebase: { profile } }) => profile)
  const authId = !auth.isEmpty && auth.uid
  const tags = useSelector(({ firestore: { ordered } }) => ordered.tags) || []

  const adminTagsColumns = [
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

  const tagsColumns = [
    {
      title: 'Reviewer',
      dataIndex: 'reviewerName',
      key: 'reviewerName'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => {
        let type = 'info'
        if (text === 'accepted') {
          type = 'success'
        } else if (text === 'rejected') {
          type = 'error'
        }
        return (
          <Alert
            style={{ maxWidth: 'fit-content' }}
            message={text}
            type={type}
          />
        )
      }
    }
  ]

  if (profile.isLoaded && profile.admin) {
    const displayedTags = tags.filter(tag => tag.recipient === authId) || []
    return (
      <div className="vh-100">
        <Table
          rowKey={record => record.id}
          columns={adminTagsColumns}
          dataSource={displayedTags.reverse() || []}
          pagination={{ position: ['', 'bottomCenter'], simple: true }}
        />
      </div>
    )
  } else if (profile.isLoaded && !profile.admin) {
    const displayedTags = tags.filter(tag => tag.sender === authId) || []
    return (
      <div className="vh-100">
        <Table
          rowKey={record => record.id}
          columns={tagsColumns}
          dataSource={displayedTags || []}
          pagination={{ position: ['', 'bottomCenter'], simple: true }}
        />
      </div>
    )
  } else {
    return ''
  }
}

export default Tags
