import React from 'react'

import { Container } from '@components/Container'
import { StyledFooter, Inner, Left, Right } from './styled'

export const Footer = () => (
  <StyledFooter>
    <Container maxWidth={1200}>
      <Inner>
        <Left>
          <div>
            Contribute on{' '}
            <a href="https://github.com/open-sorcerers/foresight-gatsby-starter">Github</a>
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
            Built with ❤️ by{' '}
            <a href="https://open.sorcerers.dev" target="_blank" rel="noopener noreferrer">
              Open Sorcerers
            </a>
          </div>
        </Right>
      </Inner>
    </Container>
  </StyledFooter>
)

export default Footer
