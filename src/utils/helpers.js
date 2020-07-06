import history from './history'
import months from './months'
import React from 'react'
import { accepted, rejected } from './constants'

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
  const dashboardLocations = ['dashboard', 'tags', 'payment', 'jobs']
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
    const month = months[date.getMonth()]
    const publicationDate = `${date.getDate()}, ${month}, ${date.getFullYear()}`
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
  let color = 'blue b--blue'
  if (text === accepted) {
    color = 'dark-green b--dark-green'
  } else if (text === rejected) {
    color = 'red b--red'
  }
  return (
    <button className={`f6 dib ba bw1 br3 ph3 dib ${color}`}>{text}</button>
  )
}

export const filterJobs = (jobs = [], uid = '') =>
  jobs.filter(job => job.recipient === uid)
