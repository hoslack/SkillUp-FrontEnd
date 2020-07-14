import React from 'react'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { getPaymentStatus } from '../../utils/helpers'

dayjs.extend(relativeTime)

const ReviewerPayments = () => {
  const paymentsQuery = {
    collection: 'payment',
    orderBy: ['timestamp', 'desc']
  }

  useFirestoreConnect(() => [paymentsQuery])
  const firestore = useFirestore()
  const profile = useSelector(({ firebase: { profile } }) => profile)
  const payments =
    useSelector(({ firestore: { ordered } }) => ordered.payment) || []

  const setPaidOut = id => firestore.update(`payment/${id}`, { paidOut: true })
  const setReceived = id =>
    firestore.update(`payment/${id}`, { received: true })

  const paymentsColumns = [
    {
      title: 'Sent By',
      dataIndex: 'sentBy',
      key: 'sentBy'
    },
    {
      title: 'Processed By',
      dataIndex: 'processedBy',
      key: 'processedBy'
    },
    {
      title: 'Amount ($)',
      dataIndex: 'amount',
      key: 'amount'
    },
    {
      title: 'Sent',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: text => <h3 className="h2 pt1">{dayjs().to(Number(text))}</h3>
    },
    {
      title: 'Paid Out',
      dataIndex: 'paidOut',
      key: 'paidOut',
      render: text => getPaymentStatus(text)
    },
    {
      title: 'Received',
      dataIndex: 'received',
      key: 'received',
      render: text => getPaymentStatus(text)
    },
    profile.email === 'h@gmail.com'
      ? {
          title: '',
          dataIndex: 'id',
          key: 'id',
          render: text => (
            <button
              className="f6 dim ph3 white bg-green br1 is-borderless"
              onClick={() => setPaidOut(text)}>
              Mark Paid Out
            </button>
          )
        }
      : {},
    profile.email !== 'h@gmail.com' && profile.admin
      ? {
          title: '',
          dataIndex: 'id',
          key: 'id',
          render: text => (
            <button
              className="f6 dim ph3 white bg-green br1 is-borderless"
              onClick={() => setReceived(text)}>
              Mark Received
            </button>
          )
        }
      : {}
  ]

  if (profile.isLoaded && profile.email === 'h@gmail.com') {
    return (
      <div className="vh-100">
        <Table
          rowKey={record => record.id}
          columns={paymentsColumns}
          dataSource={payments || []}
          pagination={{ position: ['', 'bottomCenter'], simple: true }}
        />
      </div>
    )
  } else if (profile.isLoaded && profile.admin) {
    const filteredPayments =
      payments.filter(payment => payment.sentBy === profile.email) || []
    return (
      <div className="vh-100">
        <Table
          rowKey={record => record.id}
          columns={paymentsColumns}
          dataSource={filteredPayments || []}
          pagination={{ position: ['', 'bottomCenter'], simple: true }}
        />
      </div>
    )
  } else {
    return ''
  }
}

export default ReviewerPayments
