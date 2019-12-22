import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Auth from '@services/auth'
import { LOGIN } from '@constants/routes'

const auth = Auth()

export const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { isAuthenticated } = auth
  if (!isAuthenticated() && location.pathname !== LOGIN) {
    navigate(LOGIN)
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
}

export default PrivateRoute
