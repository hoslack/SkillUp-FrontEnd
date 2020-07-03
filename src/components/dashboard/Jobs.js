import React from 'react'
import { useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import { Table } from 'antd'
import { filterJobs } from '../../utils/helpers'

const Jobs = () => {
  const auth = useSelector(({ firebase: { auth } }) => auth)
  const jobsQuery = {
    collection: 'jobs',
    orderBy: ['timestamp', 'desc']
  }
  useFirestoreConnect(() => [jobsQuery])
  const jobs = useSelector(({ firestore: { ordered } }) => ordered.jobs) || []

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 100
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
      ellipsis: true,
      width: 70
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      ellipsis: true,
      width: 100
    },
    {
      title: 'Date',
      dataIndex: 'publicationDate',
      key: 'publicationDate',
      ellipsis: true,
      width: 100
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewerName',
      key: 'reviewerName',
      width: 50
    },
    {
      title: '',
      dataIndex: 'url',
      key: 'url',
      width: 50,
      render: text => (
        <a href={text} target="blank">
          View Job
        </a>
      )
    }
  ]

  return (
    auth.isLoaded &&
    !auth.isEmpty && (
      <Table
        rowKey={record => record.id}
        columns={columns}
        dataSource={filterJobs(jobs, auth.uid)}
        pagination={{ position: ['', 'bottomCenter'], simple: true }}
      />
    )
  )
}

export default Jobs
