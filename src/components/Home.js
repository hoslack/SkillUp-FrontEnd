import React from 'react'
import Navbar from './layouts/Navbar'

function Home() {
  return (
    <div className="vh-100">
      <Navbar />
      <div className="pt5 vh-100">
        <h2 className="f1 bg-light-red">firestore demo</h2>
      </div>
    </div>
  )
}

export default Home
