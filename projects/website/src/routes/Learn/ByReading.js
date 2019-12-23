import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { getPostsWithSummary } from '@queries/posts-with-summary'
import { map } from 'ramda'

import { Container } from '@components/Container'

export const ByReading = () => {
  const data = getPostsWithSummary()
  return (
    <Container>
      <h1>Learn</h1>
      <h2>By Reading</h2>
      <ul>
        {map(
          node => (
            <>
              <pre>
                <code>{JSON.stringify(node, null, 2)}</code>
              </pre>
            </>
          ),
          data.allMdx.nodes
        )}
      </ul>
    </Container>
  )
}

ByReading.propTypes = {
  path: PropTypes.string.isRequired
}

ByReading.defaultProps = {}

export default ByReading
