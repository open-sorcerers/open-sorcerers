import React from 'react'
import { Link } from 'gatsby'
import { Box } from 'rebass'
import { Li } from '@styles/List'
import { map } from 'ramda'

import { Container } from '@components/Container'

const waysOfContributing = [
  ['/build/to-open-source', 'To Open-Source Software'],
  ['/build/by-talking', 'By talking at an event'],
  ['/build/by-doing', 'By doing']
]

export const Build = () => (
  <Container>
    <h1>Build</h1>
    <Box as="ul">
      {map(
        ([route, path]) => (
          <Li as="li" key={route}>
            <Link to={route}>{path}</Link>
          </Li>
        ),
        waysOfContributing
      )}
    </Box>
  </Container>
)

Build.propTypes = {}

Build.defaultProps = {}

export default Build
