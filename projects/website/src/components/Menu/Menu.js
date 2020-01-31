import React, { useState } from 'react'
import { withTheme } from 'emotion-theming'
import PropTypes from 'prop-types'
import { pipe, filter, identity as I, map } from 'ramda'
import Picker from '@components/Picker'

import { Auth } from '@services/auth'
import Cog from '@assets/cog.svg'
import {
  PROFILE,
  GLOSSARY,
  SERIES_FP,
  SERIES_JS,
  SERIES_OSS,
  LOGOUT,
  LOGIN
} from '@constants/routes'
import { VIEW_STATES } from '@styles/constants'
import { ProfileImg } from '@routes/Profile/ProfileImg'

import {
  ProfileImg as PImg,
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
  ({ getUserName, isAuthenticated }) => {
    const ax = isAuthenticated()
    return ax ? [ax, getUserName()] : [ax]
  },
  ([loggedIn, name]) => [
    loggedIn && [
      PROFILE,
      /* <div key="profile-image" id="menu-profile"> */
      <>
        <ProfileImg El={PImg} variant="menu">
          {name}
        </ProfileImg>
      </>,
      /* </div>, */
      'profile'
    ],
    [SERIES_FP, 'FP'],
    [SERIES_JS, 'JS', 'coming-soon'],
    [SERIES_OSS, 'OSS', 'coming-soon'],
    [GLOSSARY, 'GLOSSARY'],
    loggedIn ? [LOGOUT, 'Logout', 'log log-out'] : [LOGIN, 'Login', 'log log-in']
  ],
  filter(I)
)

export const Menu = withTheme(({ setView, view, themeConfig, theme }) => {
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
        theme={theme}
        className="settings-button"
        css={active ? activeButtonState({ theme }) : inactiveButtonState}
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
        <MenuCogTop
          className="cog-top"
          theme={theme}
          active={active}
          onClick={toggle}
          authenticated={authenticated}
        >
          <Cog />
        </MenuCogTop>
        <FloatingMenuContent onClick={eatClicksFor('floatingContent')}>
          <>
            {map(
              ([to, what, className]) => (
                <MenuItem key={to}>
                  {className !== 'coming-soon' ? (
                    <MenuLink className={className} href={to} onClick={toggle}>
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

          <Picker {...themeConfig} />
        </FloatingMenuContent>
        <MenuCog className="cog-bottom" theme={theme} active={active} onClick={toggle}>
          <Cog />
        </MenuCog>
      </FloatingMenu>
    </StyledMenu>
  )
})
Menu.propTypes = {
  setView: PropTypes.func,
  view: PropTypes.string
}

Menu.defaultProps = {
  setView: I,
  view: VIEW_STATES.DEFAULT
}

export default Menu
