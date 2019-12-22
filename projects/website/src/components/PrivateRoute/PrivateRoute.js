import React from 'react'
import PropTypes from 'prop-types'
import { navigate } from 'gatsby'
import Auth from '@services/auth'

const auth = Auth()

export const PrivateRoute = ({ component: Component, location, ...rest }) => {
  const { isAuthenticated } = auth
  if (!isAuthenticated() && location.pathname !== `/app/login`) {
    navigate('/app/login')
    return null
  }

  return <Component {...rest} />
}

PrivateRoute.propTypes = {
  component: PropTypes.element,
  location: PropTypes.string
}

export default PrivateRoute
