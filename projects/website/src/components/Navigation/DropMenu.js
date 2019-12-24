import React, { useState } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'
import { identity } from 'ramda'
import { Box } from 'rebass'

import Cog from '@assets/cog.svg'
import { ProfileImg } from '@routes/Profile/ProfileImg'
import { SETTINGS } from '@constants/routes'
import { Li } from '@styles/List'

import {
  activeState,
  inactiveState,
  StyledDropMenu,
  inactiveDropMenu,
  activeDropMenu,
  SettingsButton
} from './styled'

export const DropMenu = ({ setView, view }) => {
  console.log('threaded?', setView, view)
  const [active, setActive] = useState(false)
  const toggle = () => {
    const bb = !active
    setView(bb ? 'menu-active' : 'default')
    setActive(bb)
  }

  const wrapperStyle = active ? activeDropMenu : inactiveDropMenu
  return (
    <StyledDropMenu onClick={toggle}>
      <SettingsButton css={active ? activeState : inactiveState}>
        <Cog />
      </SettingsButton>
      <Box as="nav" css={wrapperStyle}>
        <Box as="ul">
          <Li as="li">
            <Link to={SETTINGS}>Settings</Link>
          </Li>
        </Box>
      </Box>
    </StyledDropMenu>
  )
}
DropMenu.propTypes = {
  setView: PropTypes.func,
  view: PropTypes.string
}

DropMenu.defaultProps = {
  setView: identity,
  view: 'default'
}

export default DropMenu
