import React from 'react'
import { Link } from 'gatsby'

import { Container } from '@components/Container'
import { StyledFooter, Inner, Left, Right } from './styled'

export const Footer = () => (
  <StyledFooter>
    <Container maxWidth={1200}>
      <Inner>
        <Left>
          <div>
            Contribute on <a href="https://github.com/open-sorcerers">Github</a>
          </div>
          <div>
            Created with{' '}
            <a href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">
              Gatsby
            </a>
          </div>
        </Left>
        <Right>
          <div>
            Built with{' '}
            <span role="img" aria-label="love">
              💜
            </span>{' '}
            by <Link to="/contributors">Open Sorcerers</Link>
          </div>
        </Right>
      </Inner>
    </Container>
  </StyledFooter>
)

export default Footer
