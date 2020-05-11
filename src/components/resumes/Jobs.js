import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import months from '../../utils/months'

const Jobs = ({ profession }) => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios
      .get(
        `https://www.themuse.com/api/public/jobs?page=1&category=${profession}`,
        {}
      )
      .then(response => {
        setIsLoaded(true)
        setJobs(response.data.results)
      })
      .catch(error => {
        setIsLoaded(true)
        setError(error)
        console.log(error)
      })
  }, [profession])

  const processJobsData = (jobs = []) => {
    return jobs.map(job => {
      const date = new Date(job.publication_date)
      const month = months[date.getMonth()]
      const publicationDate = `${date.getDate()}, ${month}, ${date.getFullYear()}`
      return {
        title: job.name,
        company: job.company.name,
        url: job.refs.landing_page,
        publicationDate,
        level: job.levels[0].name || ''
      }
    })
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
    }
  ]

  return (
    <Table
      rowKey={record => record.id}
      columns={columns}
      dataSource={processJobsData(jobs)}
      pagination={{ position: ['', 'bottomCenter'], simple: true }}
    />
  )
}

export default Jobs
