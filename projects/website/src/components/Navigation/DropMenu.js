import React, { useState } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { ProfileImg } from '@components/Profile/ProfileImg'
import { SETTINGS } from '@constants/routes'

export const DropMenu = () => {
  const [active, setActive] = useState(false)
  return (
    <div onMouseOver={() => setActive(true)} onMouseOut={() => setActive(false)}>
      <ProfileImg />
      {active ? (
        <ul>
          <li>
            <Link to={SETTINGS}>Settings</Link>
          </li>
        </ul>
      ) : null}
    </div>
  )
}
DropMenu.propTypes = {}

export default DropMenu
