import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { css } from '@emotion/core'

import { Theme } from '@domain/Theme'
import { Navigation } from '@components/Navigation'
import { Footer } from '@components/Footer'
import { injectChildren } from '@utils/react'

import { SEO } from './SEO'
import { Main } from './styled'
import { map, join, pipe } from 'ramda'

export const stateView = ({ setView, view }) => ({ setView, view })

const eased = pipe(
  map(x => `${x} 0.6s ease-in`),
  join(', ')
)(['position', 'top', 'left', 'padding'])

const defaultStyles = css`
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  top: 0;
  position: relative;
  transition: ${eased};
`

const Styled = ({ view, seo, children, ...other }) => {
  const siteStyles =
    view === 'default'
      ? defaultStyles
      : css`
          ${defaultStyles}
          background-color: transparent;
          padding-right: 33vw;
        `
  return (
    <div css={siteStyles}>
      <SEO seo={seo} {...other} />
      <Navigation {...other} />
      <Main {...other}>{children}</Main>
      <Footer {...other} />
    </div>
  )
}
Styled.propTypes = {
  view: PropTypes.string,
  seo: PropTypes.object,
  children: PropTypes.node
}

const Site = ({ children, seo, ...rest }) => {
  const viewState = useState('default')
  const [view, setView] = viewState
  const viewable = { view, setView }
  const other = { ...rest, seo, ...viewable }
  const kids = injectChildren(viewable, children)
  return (
    <Theme>
      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
          position: 'relative',
          padding: 0,
          margin: 0,
          left: 0,
          top: 0
        }}
      >
        <Styled {...other}>{kids}</Styled>
      </div>
    </Theme>
  )
}

Site.propTypes = {
  children: PropTypes.node,
  seo: SEO.propTypes.seo
}

Site.defaultProps = {
  children: null,
  seo: {}
}

export { Site }
