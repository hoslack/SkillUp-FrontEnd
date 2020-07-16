export const firebase = {
  apiKey: 'AIzaSyDeR9JvAM0-KGibJMs0ZDRfCjPK8tPsLeQ',
  authDomain: 'skillapp-ac118.firebaseapp.com',
  databaseURL: 'https://skillapp-ac118.firebaseio.com',
  projectId: 'skillapp-ac118',
  storageBucket: 'skillapp-ac118.appspot.com',
  messagingSenderId: '844779112064',
  appId: '1:844779112064:web:0ed332057ba8c5539e4865',
  measurementId: 'G-JRBGT9N4R1'
}

const profileFactory = (userData, profileData, firebase) => {
  const {
    firstName,
    lastName,
    email,
    admin,
    profession,
    resume,
    subscription
  } = profileData
  const initials = `${firstName[0]}${lastName[0]}`.toUpperCase()
  return {
    email,
    firstName,
    lastName,
    admin,
    profession,
    resume,
    initials,
    subscription
  }
}

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  enableLogging: false,
  profileFactory
}

export default { firebase, rrfConfig }
