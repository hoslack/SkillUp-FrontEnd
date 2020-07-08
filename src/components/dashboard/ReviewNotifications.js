import React from 'react'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import { filterByRecipient } from '../../utils/helpers'
import dayjs from 'dayjs'

const ReviewNotifications = () => {
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const notificationsQuery = {
    collection: 'notifications',
    orderBy: ['timestamp', 'desc']
  }
  useFirestoreConnect(() => [notificationsQuery])
  const notifications =
    useSelector(({ firestore: { ordered } }) => ordered.notifications) || []

  const columns = [
    {
      title: 'Title',
      dataIndex: 'reviewer',
      key: 'reviewer',
      width: 100,
      render: text => <h2>{text} has added a review</h2>
    },
    {
      title: 'Received',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 100,
      render: text => <h3 className="h2 pt1">{dayjs().to(Number(text))}</h3>
    },
    {
      title: '',
      dataIndex: 'recipient',
      key: 'recipient',
      width: 50,
      render: text => <a href={`review/${text}`}>Open</a>
    }
  ]

  return (
    auth.isLoaded &&
    !auth.isEmpty &&
    notifications.length > 0 && (
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={filterByRecipient(notifications, auth.uid)}
        pagination={{ position: ['none', 'bottomCenter'], simple: true }}
      />
    )
  )
}

export default ReviewNotifications
