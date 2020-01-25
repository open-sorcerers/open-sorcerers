import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { ifElse, pipe, split, map, pathOr } from 'ramda'
import { Breakpoints } from '@styles/media'
import PKG from '@root/package.json'

import { Container } from '@components/Container'
import { checkWindowExists } from '@utils/url'
import { HiddenContent, StyledFooter, Inner, Left, Right } from './styled'

const parseISODate = pipe(
  pathOr('', ['currentBuildDate', 'currentDate']),
  split('T'),
  ([mdy = '', hms = '']) => split('-', mdy).concat(split(':', hms)),
  map(zz => {
    const d = zz.indexOf('.')
    return d > -1 ? zz.slice(0, d) : zz
  }),
  ([y, m, d, h, mm, s]) => `${d}-${m}-${y} at ${h}:${mm}:${s} UTC`
)

const hasBreakpointsInQueryString = ifElse(
  checkWindowExists,
  pipe(
    () => new URLSearchParams(window && window.location && window.location.search),
    z => z.get('breakpoints'),
    z => !!z
  ),
  () => false
)

export const Footer = ({ siteData }) => {
  const [isOpen, setOpen] = useState(false)
  const [breakpointsActive, setBreakpointsActive] = useState(hasBreakpointsInQueryString())
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
              <span
                role="img"
                css={css`
                  user-select: none;
                `}
                aria-label="love"
                onDoubleClick={e => {
                  e.stopPropagation()
                  setOpen(!isOpen)
                }}
              >
                {!isOpen ? '💛' : '✨'}
              </span>
              by <Link to="/contributors">Open Sorcerers</Link>
            </div>
            <div>
              <Link to="/references">📚 References</Link>
            </div>
          </Right>
        </Inner>
        {isOpen ? (
          <HiddenContent>
            <h6>open.sorcerers.dev</h6>
            <div className="brain">🧠 </div>
            <div className="version">v{PKG.version}</div>
            <div>
              <strong>Build time: </strong>
              <span id="current-date">{`${date}`}</span>
            </div>
            <div>
              <strong>Environment: </strong>
              <span id="environment">{process.env.NODE_ENV}</span>
            </div>
            <div>
              <strong>Breakpoints: </strong>
              <input
                type="checkbox"
                onClick={() => setBreakpointsActive(!breakpointsActive)}
                checked={breakpointsActive}
              />
            </div>
          </HiddenContent>
        ) : null}
        {breakpointsActive && <Breakpoints />}
      </Container>
    </StyledFooter>
  )
}

Footer.propTypes = { siteData: PropTypes.object }

export default Footer
