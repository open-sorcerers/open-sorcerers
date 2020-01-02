import React from 'react'
import { navigate } from 'gatsby'
import { PROFILE } from '@constants/routes'
import Auth from '@services/auth'

const auth = Auth()

export const Login = () => {
  const { isAuthenticated } = auth
  if (isAuthenticated()) {
    navigate(PROFILE)
    return
  }
  return <button onClick={auth.login}>Login</button>
}

export default Login
