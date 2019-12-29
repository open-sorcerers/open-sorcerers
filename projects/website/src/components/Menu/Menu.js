import React, { useState } from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { map, identity } from 'ramda'

import Cog from '@assets/cog.svg'
import { Li } from '@styles/List'
import { SETTINGS } from '@constants/routes'
import { VIEW_STATES } from '@styles/constants'
/* import { ProfileImg } from '@routes/Profile/ProfileImg' */

import {
  /* menuWrapper, */
  floatingMenu,
  SettingsButton,
  StyledMenu,
  activeButtonState,
  inactiveButtonState,
  activeMenu,
  inactiveMenu
} from './styled'

const MENU_LINKS = [[SETTINGS, 'Settings']]

export const Menu = ({ setView, view }) => {
  const [active, setActive] = useState(view === VIEW_STATES.MENU_ACTIVE)
  const toggle = () => {
    const bb = !active
    setView(bb ? VIEW_STATES.MENU_ACTIVE : VIEW_STATES.DEFAULT)
    setActive(bb)
  }
  console.log('view', view)

  const floating = active ? activeMenu : inactiveMenu
  return (
    <StyledMenu className="styled-menu" onClick={toggle}>
      <SettingsButton
        className="settings-button"
        css={active ? activeButtonState : inactiveButtonState}
      >
        <Cog />
      </SettingsButton>
      <div className="floating-menu" css={[floatingMenu, floating]}>
        <ul>
          {map(
            ([to, what]) => (
              <Li as="li" key={to}>
                <Link to={to}>{what}</Link>
              </Li>
            ),
            MENU_LINKS
          )}
        </ul>
      </div>
    </StyledMenu>
  )
}
Menu.propTypes = {
  setView: PropTypes.func,
  view: PropTypes.string
}

Menu.defaultProps = {
  setView: identity,
  view: VIEW_STATES.DEFAULT
}

export default Menu
