import React from 'react'
import { navigate } from 'gatsby'
import { PROFILE } from '@constants/routes'
import Auth from '@services/auth'

import { StyledLogin, LoginButton } from './styled'

const auth = Auth()

export const Login = () => {
  const { isAuthenticated } = auth
  if (isAuthenticated()) {
    navigate(PROFILE)
    return
  }
  return (
    <StyledLogin>
      You can login with our OAuth sign-on here:
      <LoginButton onClick={auth.login}>Login</LoginButton>
    </StyledLogin>
  )
}

export default Login
