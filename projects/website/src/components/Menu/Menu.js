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
  MenuCog,
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
  const eatClicks = e => {
    e.preventDefault()
    return false
  }
  const eatClicksFor = what => e => {
    console.log('what', what)
    console.log('eeee', e)
    e.preventDefault()
    return false
  }
  return (
    <StyledMenu className="styled-menu">
      <SettingsButton
        className="settings-button"
        css={active ? activeButtonState : inactiveButtonState}
        onClick={toggle}
      >
        <Cog />
      </SettingsButton>
      <FloatingMenu className="floating-menu" css={floating} onClick={eatClicksFor('floatingMenu')}>
        <FloatingMenuContent onClick={eatClicksFor('floatingContent')}>
          <>
            {map(
              ([to, what]) => (
                <MenuItem key={to}>
                  <MenuLink to={to} onClick={toggle}>
                    {what}
                  </MenuLink>
                </MenuItem>
              ),
              MENU_LINKS
            )}
            <MenuItem key="quiz">
              <MenuLink onClick={eatClicks}>QUIZ</MenuLink>
            </MenuItem>
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
