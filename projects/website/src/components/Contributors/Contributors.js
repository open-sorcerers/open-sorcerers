import React from 'react'
import PropTypes from 'prop-types'

import { css } from '@emotion/core'
import { prop, pipe, pathOr, map } from 'ramda'
import { Badge } from '@components/Badge'

import { getContributors } from '@queries/contributors'
import { Img } from '@routes/Profile/styled'

import { Li, StyledContributors, StyledContributor } from './styled'

const contribs = pipe(prop('contributions'), z => (z > 999 ? Math.floor(z / 100) / 10 + 'K' : z))

/* <Badge content="" variant="left" /> */
const Contributor = pp => (
  <StyledContributor dataurl={pp.avatarUrl}>
    <a href={pp.url}>
      <Badge content={contribs(pp)} />
      <Img
        css={css`
          display: inline-block;
        `}
      >
        <img src={pp.avatarUrl} />
        <strong>{pp.login}</strong>
      </Img>
    </a>
  </StyledContributor>
)

Contributor.propTypes = {
  url: PropTypes.string,
  avatarUrl: PropTypes.string,
  login: PropTypes.string,
  contributions: PropTypes.number
}

export const Contributors = () => {
  const data = getContributors()
  return (
    <StyledContributors>
      <h2>The people behind this site</h2>
      <ul>
        {pipe(
          pathOr([], ['allGitHubContributor', 'nodes']),
          /*
          concat([
            {
              id: 'fake',
              url: 'yes',
              avatarUrl: 'fake',
              login: 'Fako',
              contributions: 1000
            },

            {
              id: 'fake2',
              url: 'yes',
              avatarUrl: 'fake',
              login: 'Fako2',
              contributions: 500
            },
            {
              id: 'fake3',
              url: 'yes',
              avatarUrl: 'fake',
              login: 'Fako3',
              contributions: 100
            },

            {
              id: 'fake4',
              url: 'yes',
              avatarUrl: 'fake',
              login: 'Fako4',
              contributions: 1234
            },

            {
              id: 'fake5',
              url: 'yes',
              avatarUrl: 'fake',
              login: 'Fako5',
              contributions: 987
            },
            {
              id: 'fake6',
              url: 'yes',
              avatarUrl: 'fake',
              login: 'Fako6',
              contributions: 256
            }
          ]),
          // */
          map(z => (
            <Li as="li" key={z.id}>
              <Contributor {...z} />
            </Li>
          ))
        )(data)}
      </ul>
    </StyledContributors>
  )
}

export default Contributors
