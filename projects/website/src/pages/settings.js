import React from 'react'
import { Link } from 'gatsby'
import { Router } from '@reach/router'
import { PrivateRoute } from '@routes/Private'
import { Profile } from '@routes/Profile'
import { Login } from '@routes/Login'
import { Logout } from '@routes/Logout'
import { Site } from '@domain/Site'
import { Auth } from '@services/auth'
import { PROFILE, LOGIN, LOGOUT, SETTINGS } from '@constants/routes'
const seo = { title: 'Open Sorcerers' }

const SettingsRoot = () => {
  const auth = Auth()
  console.log('auth', auth)
  const { isAuthenticated } = auth
  return (
    <section>
      <h1>Settings</h1>
      <ul>
        <li>
          {isAuthenticated() ? <Link to={PROFILE}>Profile</Link> : <Link to={LOGIN}>Login</Link>}
        </li>
      </ul>
    </section>
  )
}

const Settings = ({ ...rest }) => (
  <Site seo={seo} {...rest}>
    <Router>
      <PrivateRoute path={PROFILE} component={Profile} />
      <Login path={LOGIN} />
      <Logout path={LOGOUT} />
      <SettingsRoot path={SETTINGS} />
    </Router>
  </Site>
)

export default Settings
