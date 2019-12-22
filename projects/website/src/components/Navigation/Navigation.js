import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { uid } from 'react-uid'
import { DropMenu} from './DropMenu'
import Github from '@assets/github.svg'
import OpenSorcerersLogo from '@assets/open-sorcerers.svg'

import { Container } from '@components/Container'
import { StyledNavigation, Inner, Brand, Nav, Item, Social } from './styled'

const items = [
  { label: 'Learn', to: '/learn/' },
  { label: 'Contribute', to: '/contribute/' },
  { label: 'Ask', to: '/ask/' }
]

const Navigation = ({ path }) => {
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
  return (
    <StyledNavigation>
      <Container maxWidth={1200}>
        <Inner>
          <Brand to="/">
            <OpenSorcerersLogo title={name} />
          </Brand>
          <Nav>
            {items.map(({ label, to, href }) =>
              to ? (
                <Item key={uid(label)} to={to} isActive={to === path}>
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
            <DropMenu />
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
