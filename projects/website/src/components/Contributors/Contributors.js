import React from 'react'
import PropTypes from 'prop-types'

import { css } from '@emotion/core'
import { Box } from 'rebass'
import { prop, pipe, pathOr, map } from 'ramda'
import { Badge } from '@components/Badge'

import { getContributors } from '@queries/contributors'
import { Img } from '@routes/Profile/styled'

import { StyledContributors, StyledContributor } from './styled'

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
  console.log('DATA', data)
  return (
    <StyledContributors>
      <h1>The Open Sorcerers</h1>
      <h2>The people behind this site</h2>
      <ul>
        {pipe(
          pathOr([], ['allGitHubContributor', 'nodes']),
          map(z => (
            <li key={z.id}>
              <Contributor {...z} />
            </li>
          ))
        )(data)}
      </ul>
    </StyledContributors>
  )
}

export default Contributors
