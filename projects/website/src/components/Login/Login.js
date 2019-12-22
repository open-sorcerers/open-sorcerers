import React, { useState } from 'react'
import { navigate } from 'gatsby'
import Auth from '@services/auth'

const auth = Auth()

export const Login = () => {
  const { isAuthenticated } = auth
  if (isAuthenticated()) {
    navigate('/app/profile')
    return
  }
  return <button onClick={auth.login}>Login</button>
}

export default Login
