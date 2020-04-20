import React from 'react'
import { Table } from 'antd'
import { jobs } from '../../utils/jobs'

const Jobs = () => {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'tile',
      ellipsis: true,
      width: 130
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: 50
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      ellipsis: true,
      width: 100
    },
    {
      title: 'View',
      dataIndex: 'url',
      key: 'url',
      width: 50,
      render: text => <a href={`/review/${text}`}>View Job</a>
    }
  ]

  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      dataSource={jobs}
      pagination={{ position: ['', 'bottomCenter'], simple: true }}
    />
  )
}

export default Jobs
