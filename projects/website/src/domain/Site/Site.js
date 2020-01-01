import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Theme } from '@domain/Theme'
import { Navigation } from '@components/Navigation'
import { Footer } from '@components/Footer'
/* import { Breakpoints } from '@styles/media' */
import { injectChildren } from '@utils/react'
import { Z_INDEX, VIEW_STATES } from '@styles/constants'

import { SEO } from './SEO'
import { Main, site, menuActive } from './styled'

export const stateView = ({ setView, view }) => ({ setView, view })

const Styled = ({ children, ...other }) => {
  const { view, seo } = other
  const isActive = view === VIEW_STATES.MENU_ACTIVE
  const props = isActive ? { css: menuActive } : {}

  return (
    <section {...props} css={site} className="website">
      <SEO seo={seo} {...other} />
      <Navigation {...other} />
      <Main {...other}>{children}</Main>
      <Footer {...other} />
    </section>
  )
}
Styled.propTypes = {
  view: PropTypes.string,
  seo: PropTypes.object,
  children: PropTypes.node
}

const SiteInner = ({ children, ...other }) => (
  <div
    style={{
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      position: 'relative',
      padding: 0,
      margin: 0,
      left: 0,
      top: 0,
      zIndex: Z_INDEX.DEFAULT
    }}
  >
    <Styled {...other}>{children}</Styled>
  </div>
)
SiteInner.propTypes = {
  children: PropTypes.node
}

const Site = ({ children, seo, ...rest }) => {
  const viewState = useState(VIEW_STATES.DEFAULT)
  const [view, setView] = viewState
  const viewable = { view, setView }
  const other = { ...rest, seo, ...viewable }
  const kids = injectChildren(viewable, children)
  return (
    <Theme>
      <SiteInner {...other}>{kids}</SiteInner>
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
