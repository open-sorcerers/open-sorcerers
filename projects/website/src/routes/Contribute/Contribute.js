import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Box } from 'rebass'
import { Li } from '@styles/List'
import { map } from 'ramda'

import { Container } from '@components/Container'

const waysOfContributing = [
  ['/contribute/to-open-source', 'To Open-Source Software'],
  ['/contribute/by-talking', 'By talking at an event'],
  ['/contribute/by-doing', 'By doing']
]

export const Contribute = () => {
  return (
    <Container>
      <h1>Contribute</h1>
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
}

Contribute.propTypes = {}

Contribute.defaultProps = {}

export default Contribute
