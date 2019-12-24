import React from 'react'
import PropTypes from 'prop-types'
import { Box } from 'rebass'
import { map } from 'ramda'
import { Li } from '@styles/List'

import { Container } from '@components/Container'

const waysOfAsking = [
  ['//twitter.com/osorcerers', 'On Twitter'],
  ['//open-sorcerers.slack.com', 'On Slack'],
  ['//meetup.com/open-sorcerers', 'At an event']
]

export const Ask = () => (
  <Container>
    <h1>Ask</h1>
    <Box as="ul">
      {map(
        ([route, path]) => (
          <Li as="li" key={route}>
            <a href={route}>{path}</a>
          </Li>
        ),
        waysOfAsking
      )}
    </Box>
  </Container>
)

Ask.propTypes = {
  path: PropTypes.string.isRequired
}

Ask.defaultProps = {}

export default Ask
