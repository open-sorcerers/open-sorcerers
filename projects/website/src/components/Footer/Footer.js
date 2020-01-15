import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { pipe, split, map, pathOr } from 'ramda'

import { Container } from '@components/Container'
import { StyledFooter, Inner, Left, Right } from './styled'

const parseISODate = pipe(
  pathOr('', ['currentBuildDate', 'currentDate']),
  split('T'),
  ([mdy = '', hms = '']) => split('-', mdy).concat(split(':', hms)),
  map(zz => {
    const d = zz.indexOf('.')
    return d > -1 ? zz.slice(0, d) : zz
  }),
  ([y, m, d, h, mm, s]) => `${d}-${m}-${y} at ${h}:${mm}:${s}`
  /* ([y, m, d, h, mm, s]) => new Date(y + '-' + d + '-' + m + ' ' + h + ':' + mm + ':' + s) */
)

export const Footer = ({ siteData }) => {
  const date = parseISODate(siteData)
  return (
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
            <br />
            Last built on <span>{`${date}`}</span>
          </Right>
        </Inner>
      </Container>
    </StyledFooter>
  )
}

Footer.propTypes = { siteData: PropTypes.object }

export default Footer
