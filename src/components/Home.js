import React from 'react'
import { Navbar } from './layouts'
import { useSelector } from 'react-redux'
import history from '../utils/history'

const Home = () => {
  const auth = useSelector(state => state.firebase.auth)
  if (!auth.isEmpty) {
    history.push('/dashboard', {})
  }
  return (
    <div className="vh-100">
      <header className="sans-serif">
        <div
          className="cover bg-left bg-center-l vh-100"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80)'
          }}>
          <div className="bg-black-80 pb5 pb6-m pb7-l vh-100">
            <nav className="dt w-100">
              <Navbar />
            </nav>
            <div className="tc-l mt4 mt5-m mt6-l ph3">
              <h1 className="f1 f1-l fw4 white-90 mb0 lh-title">
                Welcome to Skill App
              </h1>
              <h2 className="fw2 f2 white-80 mt3 mb4 w-75 center">
                Welcome to the largest community of professionals that supports
                your career journey by reviewing your Resume for efficient job
                Applications
              </h2>
              <h2 className="fw2 f3 white-80 mt3 mb4 w-50 center">
                It's easy to get started, just sign up and upload your{' '}
                <span className="fw7">One Page</span> Resume then tag a suitable
                reviewer
              </h2>
              <a
                className="f6 no-underline grow dib v-mid bg-blue white ba b--blue ph3 pv2 mb3"
                href="/">
                See Guidelines
              </a>
              <span className="dib v-mid ph3 white-70 mb3">or</span>
              <a
                className="f6 no-underline grow dib v-mid white ba b--white ph3 pv2 mb3"
                href="/">
                Learn More About Skill App
              </a>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Home
