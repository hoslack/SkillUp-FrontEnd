import React, { useEffect, useState } from 'react'
import { useFirestore } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import {Checkbox, Table} from 'antd'

const Tags = () => {
  const [tags, setTags] = useState([])
  const [jobs, setJobs] = useState([])
  const db = useFirestore()
  const auth = useSelector(state => state.firebase.auth)
  const authId = !auth.isEmpty && auth.uid

  useEffect(() => {
    const tagsArray = []
    db.collection('tags').onSnapshot(
      snapshot => {
        snapshot.forEach(doc => {
          tagsArray.push(doc.data())
        })
        setTags(tagsArray)
      },
      error => {
        console.log(error)
      }
    )
  }, [db, authId])

  const jobColumns = [
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
        columns={adminTagsColumns}
        dataSource={tags || []}
        pagination={{ position: ['', 'bottomCenter'], simple: true }}
      />
      <Table
        rowKey={record => record.id}
        columns={adminTagsColumns}
        dataSource={tags || []}
        pagination={{ position: ['', 'bottomCenter'], simple: true }}
      />
    </div>
  )
}

export default Tags
