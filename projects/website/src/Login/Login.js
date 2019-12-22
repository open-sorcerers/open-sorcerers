import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { handleLogin, isLoggedIn, getUser } from '@services/auth'
import { PROFILE } from '@constants/routes'

export const Login = () => {
  const [username, setUser] = useState('')
  const [password, setPassword] = useState('')

  console.log('getUser', getUser())
  if (isLoggedIn()) {
    navigate(PROFILE)
  }

  return (
    <>
      <h1>Log in</h1>
      <label>Username</label>
      <input type="text" name="username" onChange={e => setUser(e.target.value)} />
      <label>Password</label>
      <input type="password" name="password" onChange={e => setPassword(e.target.value)} />
      <button
        onClick={() => {
          const success = handleLogin({ username, password })
          if (success) navigate(PROFILE)
        }}
      >
        Login
      </button>
    </>
  )
}

export default Login
