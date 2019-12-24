import React from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'
import { uid } from 'react-uid'
import { stateView } from '@domain/Site'
import { checkWindowExists } from '@utils/url'
import OpenSorcerersLogo from '@assets/open-sorcerers.svg'
import { Container } from '@components/Container'
import { DropMenu } from './DropMenu'

import { StyledNavigation, Inner, Brand, Nav, Item, Social } from './styled'

const items = [
  { label: 'Learn', to: '/learn/' },
  { label: 'Contribute', to: '/contribute/' },
  { label: 'Ask', to: '/ask/' }
]

const Navigation = props => {
  const state = stateView(props)
  let { path } = props
  if (!path && checkWindowExists()) path = window.location + ''
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
  console.log('state', state)
  const menuActive =
    state.view === 'menu-active'
      ? css`
          background: red;
          padding-left: 0;
          padding-right: 0;
        `
      : css`
          padding-left: 13vw;
          padding-right: 16vw;
        `

  return (
    <StyledNavigation as="section" css={menuActive}>
      <Container maxWidth={1200}>
        <Inner>
          <Brand to="/">
            <OpenSorcerersLogo title={name} />
          </Brand>
          <Nav as="nav">
            {items.map(({ label, to, href }) =>
              to ? (
                <Item key={uid(label)} to={to} isActive={path.includes(to)}>
                  {label}
                </Item>
              ) : (
                <Item key={uid(label)} as="a" href={href}>
                  {label}
                </Item>
              )
            )}
          </Nav>
          <Social>
            <DropMenu {...state} />
          </Social>
        </Inner>
      </Container>
    </StyledNavigation>
  )
}

Navigation.propTypes = {
  path: PropTypes.string.isRequired
}

Navigation.defaultProps = {}

export { Navigation }
