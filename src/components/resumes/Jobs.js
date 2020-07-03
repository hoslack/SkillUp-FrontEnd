import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase'
import { Table, Checkbox, message } from 'antd'
import axios from 'axios'
import { processJobsData } from '../../utils/helpers'

const Jobs = ({ profession, uid }) => {
  const tagQuery = {
    collection: 'jobs'
  }

  useFirestoreConnect(() => [tagQuery])
  const firestore = useFirestore()

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [jobs, setJobs] = useState([])
  const auth = useSelector(state => state.firebase.auth)
  const authId = !auth.isEmpty && auth.uid

  useEffect(() => {
    axios
      .get(
        `https://www.themuse.com/api/public/jobs?page=1&category=${profession}`,
        {}
      )
      .then(response => {
        setIsLoaded(true)
        setJobs(processJobsData(response.data.results))
      })
      .catch(error => {
        setIsLoaded(true)
        setError(error)
        console.log(error)
      })
  }, [profession])

  const handleAddJob = jobUrl => {
    firestore
      .collection('jobs')
      .add({
        sender: authId,
        recipient: uid,
        viewed: false,
        url: jobUrl,
        timestamp: Date.now()
      })
      .then(() => console.log('Job added successfully'))
      .catch(error => message.error(`${error.message}`))
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 130
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
      title: '',
      dataIndex: 'url',
      key: 'url',
      width: 50,
      render: text => (
        <a href={text} target="blank">
          View Job
        </a>
      )
    },
    {
      title: '',
      dataIndex: 'url',
      key: 'url',
      width: 50,
      render: text => <Checkbox onChange={() => handleAddJob(text)} />
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
