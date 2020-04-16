import history from './history'

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

export const selectTags = (tags = [], uid) =>
  tags.filter(tag => tag.recipient === uid)

export const getLocation = () => {
  const profileLocations = ['resume', 'details']
  const dashboardLocations = ['dashboard', 'tags']
  const location = history.location.pathname.split('/')[1]
  if (profileLocations.includes(location)) {
    return { selectedKey: 'profile', openKey: location }
  } else if (dashboardLocations.includes(location)) {
    return { selectedKey: 'dashboard', openKey: location }
  } else {
    return location
  }
}
