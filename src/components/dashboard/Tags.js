import React from 'react'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getStatus } from '../../utils/helpers'
import { accepted, rejected } from '../../utils/constants'
import { DeleteTwoTone } from '@ant-design/icons'

dayjs.extend(relativeTime)

const Tags = () => {
  const tagsQuery = {
    collection: 'tags',
    orderBy: ['timestamp', 'desc']
  }

  useFirestoreConnect(() => [tagsQuery])
  const firestore = useFirestore()

  const auth = useSelector(({ firebase: { auth } }) => auth)
  const profile = useSelector(({ firebase: { profile } }) => profile)
  const authId = !auth.isEmpty && auth.uid
  const tags = useSelector(({ firestore: { ordered } }) => ordered.tags) || []

  const deleteTag = id => firestore.delete(`tags/${id}`)
  const acceptOrRejectTag = (id, status) =>
    firestore.update(`tags/${id}`, { status: status })

  const adminTagsColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Received',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: text => <h3 className="h2 pt1">{dayjs().to(Number(text))}</h3>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => getStatus(text)
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: text => (
        <span>
          <button
            className="f6 dim ph3 white bg-green br1 is-borderless"
            onClick={() => acceptOrRejectTag(text, accepted)}>
            Accept
          </button>{' '}
          <button
            className="f6 dim ph3 white bg-red br1 is-borderless"
            onClick={() => acceptOrRejectTag(text, rejected)}>
            Reject
          </button>
        </span>
      )
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
      title: 'Sent',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: text => <h3 className="h2 pt1">{dayjs().to(Number(text))}</h3>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: text => getStatus(text)
    },
    {
      title: '',
      dataIndex: 'id',
      key: 'id',
      render: text => (
        <button
          className="f6 dim ph3 br3 ba b--red shadow-1"
          onClick={() => deleteTag(text)}>
          <DeleteTwoTone twoToneColor="red" />
        </button>
      )
    }
  ]

  if (profile.isLoaded && profile.admin) {
    const displayedTags = tags.filter(tag => tag.recipient === authId) || []
    return (
      <div className="vh-100">
        <Table
          rowKey={record => record.id}
          columns={adminTagsColumns}
          dataSource={displayedTags || []}
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
