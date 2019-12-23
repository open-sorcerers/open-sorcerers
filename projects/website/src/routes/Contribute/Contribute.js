import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
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
      <ul>
        {map(
          ([route, path]) => (
            <li key={route}>
              <Link to={route}>{path}</Link>
            </li>
          ),
          waysOfContributing
        )}
      </ul>
    </Container>
  )
}

Contribute.propTypes = {}

Contribute.defaultProps = {}

export default Contribute
