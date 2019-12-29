import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { pipe, filter, identity as I, map } from 'ramda'

import { Auth } from '@services/auth'
import Cog from '@assets/cog.svg'
import { BOOKMARKS, SETTINGS, PROFILE, REPL, LOGOUT, LOGIN } from '@constants/routes'
import { VIEW_STATES } from '@styles/constants'
/* import { ProfileImg } from '@routes/Profile/ProfileImg' */

import {
  MenuItem,
  menuCog,
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
    [SETTINGS, 'Settings'],
    loggedIn && [BOOKMARKS, 'Bookmarks'],
    loggedIn && [PROFILE, 'Profile'],
    [REPL, 'REPL'],
    loggedIn ? [LOGOUT, 'Logout'] : [LOGIN, 'Login']
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
  console.log('view', view)

  const floating = active ? activeMenu : inactiveMenu
  const MENU_LINKS = getLinksRelativeToAuth()
  return (
    <StyledMenu className="styled-menu" onClick={toggle}>
      <SettingsButton
        className="settings-button"
        css={active ? activeButtonState : inactiveButtonState}
      >
        <Cog />
      </SettingsButton>
      <FloatingMenu className="floating-menu" css={floating}>
        <FloatingMenuContent>
          <>
            {map(
              ([to, what]) => (
                <MenuItem key={to}>
                  <MenuLink
                    to={to}
                    onClick={e => {
                      e.preventDefault()
                    }}
                  >
                    {what}
                  </MenuLink>
                </MenuItem>
              ),
              MENU_LINKS
            )}
            <MenuItem key="quiz">
              <MenuLink
                onClick={e => {
                  e.preventDefault()
                  console.log('butts')
                }}
              >
                QUIZ
              </MenuLink>
            </MenuItem>
          </>
        </FloatingMenuContent>
        <Cog css={menuCog} onClick={() => setActive(false)} />
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
