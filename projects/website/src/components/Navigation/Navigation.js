import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { uid } from 'react-uid'
import { withTheme } from 'emotion-theming'

import { stateView } from '@domain/Site'
import Logo from '@assets/open-sorcerers2.svg'
import { Container } from '@components/Container'
import { VIEW_STATES } from '@styles/constants'
import { Menu } from '@components/Menu'

import {
  MenuWrapper,
  StyledNavigation,
  Inner,
  Brand,
  Nav,
  StyledItem,
  activeNav,
  inactiveNav
} from './styled'

const items = [
  { label: 'LEARN', to: '/learn/' },
  { label: 'BUILD', to: '/build/' },
  { label: 'ASK', to: '/ask/' }
]

const RawNavigation = props => {
  console.log('PROPRPRPRPPRORPORNAV', props)
  const state = stateView(props)
  const { path = '' } = props
  const {
    site: {
      siteMetadata: { name }
    }
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
        }
      }
    }
  `)
  const menuState = state.view === VIEW_STATES.MENU_ACTIVE ? activeNav : inactiveNav

  return (
    <StyledNavigation as="nav" css={menuState}>
      <Container maxWidth={1200}>
        <Inner>
          <Brand to="/">
            <Logo title={name} />
          </Brand>
          <Nav as="aside">
            <>
              {items.map(({ label, to, href }) =>
                to ? (
                  <StyledItem key={uid(label)} to={to} isActive={path.includes(to)}>
                    {label}
                  </StyledItem>
                ) : (
                  <StyledItem key={uid(label)} as="a" href={href}>
                    {label}
                  </StyledItem>
                )
              )}
              <MenuWrapper>
                <Menu {...state} />
              </MenuWrapper>
            </>
          </Nav>
        </Inner>
      </Container>
    </StyledNavigation>
  )
}

RawNavigation.propTypes = {
  path: PropTypes.string.isRequired
}

RawNavigation.defaultProps = {}

export const Navigation = withTheme(RawNavigation)
export default Navigation
