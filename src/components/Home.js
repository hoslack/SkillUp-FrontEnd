import React from 'react'
import Todos from './Todos'
import NewTodo from './NewTodo'

function Home() {
  return (
    <div className="App">
      <div className="App-header">
        <h2>firestore demo</h2>
      </div>
      <div className="App-todos">
        <h4>
          Loaded From <br />
          <span className="App-Url">
            <a
              className="App-link"
              href="https://redux-firebasev3.firebaseio.com/"
              target="_blank"
              rel="noopener noreferrer">
              redux-firebasev3.firebaseio.com
            </a>
          </span>
        </h4>
        <h4>Todos List</h4>
        <Todos />
        <NewTodo />
      </div>
    </div>
  )
}

export default Home
