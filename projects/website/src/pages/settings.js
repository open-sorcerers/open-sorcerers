import React from 'react'
import {Link} from 'gatsby'
import { Router } from '@reach/router'
import { PrivateRoute } from '@components/PrivateRoute'
import { Profile } from '@components/Profile'
import { Login } from '@components/Login'
import { Logout } from '@components/Logout'
import { Site } from '@components/Site'
import { PROFILE, LOGIN, LOGOUT, SETTINGS } from '@constants/routes'
const seo = { title: 'Open Sorcerers' }

const SettingsRoot = () => (
  <section>
    <h1>Settings</h1>
    <ul>
      <li>
        <Link to={PROFILE}>Profile</Link>
      </li>
    </ul>
  </section>
)

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
