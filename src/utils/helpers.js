import history from './history'
import React from 'react'
import { accepted, rejected } from './constants'
import { Tag } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getBase64 = file =>
  new Promise(resolve => {
    let baseURL = ''
    const reader = new window.FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      baseURL = reader.result
      resolve(baseURL)
    }
  })

export const alterUsers = (users = []) =>
  users.map(object => {
    const role = object.admin ? 'Reviewer' : 'Candidate'
    return { ...object, role }
  })

export const selectReviews = (reviews = [], uid) =>
  reviews.filter(review => review.userId === uid)

export const getLocation = () => {
  const profileLocations = ['resume', 'details']
  const dashboardLocations = ['dashboard', 'tags', 'jobs']
  const location = history.location.pathname.split('/')[1]
  if (profileLocations.includes(location)) {
    return { selectedKey: 'profile', openKey: location }
  } else if (dashboardLocations.includes(location)) {
    return { selectedKey: 'dashboard', openKey: location }
  } else {
    return location
  }
}

export const processJobsData = (jobs = []) => {
  return jobs.map(job => {
    const date = new Date(job.publication_date)
    const publicationDate = dayjs(date).format('MMM, DD YYYY')
    return {
      id: job.id,
      title: job.name,
      company: job.company.name,
      url: job.refs.landing_page,
      publicationDate,
      level: job.levels[0].name || ''
    }
  })
}

export const getStatus = text => {
  let color = 'geekblue'
  if (text === accepted) {
    color = 'green'
  } else if (text === rejected) {
    color = 'volcano'
  }
  return <Tag color={color}>{text}</Tag>
}

export const filterByRecipient = (data = [], uid = '') =>
  data.filter(item => item.recipient === uid)
