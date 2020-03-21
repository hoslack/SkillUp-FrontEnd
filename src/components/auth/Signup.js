import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { signUp } from '../../store/actions'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(signUp({ firstName, lastName, username, email, password }))
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="white">
        <h5 className="grey-text text-darken-3 ">Sign Up</h5>

        <div className="input-field">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            onChange={e => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            onChange={e => setLastName(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            onChange={e => setUsername(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="input-field">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="input-field">
          <button className="btn pink lighten-1 z-depth-0">Sign Up</button>
        </div>
      </form>
    </div>
  )
}

export default Signup
