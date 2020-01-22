import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { pipe, filter, identity as I, map } from 'ramda'

import { Auth } from '@services/auth'
import Cog from '@assets/cog.svg'
import { PROFILE, SERIES_FP, SERIES_JS, SERIES_OSS, LOGOUT, LOGIN } from '@constants/routes'
import { VIEW_STATES } from '@styles/constants'
import { ProfileImg } from '@routes/Profile/ProfileImg'

import {
  MenuItem,
  MenuCog,
  MenuCogTop,
  MenuLink,
  FloatingMenuContent,
  FloatingMenu,
  SettingsButton,
  StyledMenu,
  activeButtonState,
  inactiveButtonState,
  activeMenu,
  inactiveMenu
} from './styled'

const getLinksRelativeToAuth = pipe(
  Auth,
  ({ isAuthenticated }) => isAuthenticated(),
  loggedIn => [
    loggedIn && [
      PROFILE,
      <div key="profile-image">
        <ProfileImg variant="menu" />
        Profile
      </div>
    ],
    [SERIES_FP, 'FP'],
    [SERIES_JS, 'JS', 'coming-soon'],
    [SERIES_OSS, 'OSS', 'coming-soon'],
    loggedIn ? [LOGOUT, 'Logout', 'log log-out'] : [LOGIN, 'Login', 'log log-in']
  ],
  filter(I)
)

export const Menu = ({ setView, view }) => {
  const [active, setActive] = useState(view === VIEW_STATES.MENU_ACTIVE)
  const toggle = () => {
    const bb = !active
    setView(bb ? VIEW_STATES.MENU_ACTIVE : VIEW_STATES.DEFAULT)
    setActive(bb)
  }

  const floating = active ? activeMenu : inactiveMenu
  const MENU_LINKS = getLinksRelativeToAuth()
  const eatClicksFor = () => e => {
    e.preventDefault()
    return false
  }
  const authenticated = Auth().isAuthenticated()
  return (
    <StyledMenu className="styled-menu">
      <SettingsButton
        className="settings-button"
        css={active ? activeButtonState : inactiveButtonState}
        onClick={toggle}
      >
        <Cog />
      </SettingsButton>
      <FloatingMenu
        authenticated={authenticated}
        className="floating-menu"
        css={floating}
        onClick={eatClicksFor('floatingMenu')}
      >
        <MenuCogTop active={active} onClick={toggle} authenticated={authenticated}>
          <Cog />
        </MenuCogTop>
        <FloatingMenuContent onClick={eatClicksFor('floatingContent')}>
          <>
            {map(
              ([to, what, className]) => (
                <MenuItem key={to}>
                  {className !== 'coming-soon' ? (
                    <MenuLink className={className} to={to} onClick={toggle}>
                      {what}
                    </MenuLink>
                  ) : (
                    <MenuLink className={className}>{what}</MenuLink>
                  )}
                </MenuItem>
              ),
              MENU_LINKS
            )}
          </>
        </FloatingMenuContent>
        <MenuCog active={active} onClick={toggle}>
          <Cog />
        </MenuCog>
      </FloatingMenu>
    </StyledMenu>
  )
}
Menu.propTypes = {
  setView: PropTypes.func,
  view: PropTypes.string
}

Menu.defaultProps = {
  setView: I,
  view: VIEW_STATES.DEFAULT
}

export default Menu
