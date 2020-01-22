import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'

import { Theme } from '@domain/Theme'
import { Navigation } from '@components/Navigation'
import { Footer } from '@components/Footer'
import { injectChildren } from '@utils/react'
import { Z_INDEX, VIEW_STATES } from '@styles/constants'
import { checkWindowExists } from '@utils/url'

import { SEO } from './SEO'
import {
  PasswordLabel,
  PasswordField,
  PasswordInput,
  PasswordButton,
  PasswordProtected,
  Main,
  site,
  menuActive
} from './styled'

export const stateView = ({ setView, view }) => ({ setView, view })

const Styled = ({ children, ...other }) => {
  const { view, seo } = other
  const [hidden, setHidden] = useState(true)
  const [currentPassword, setPass] = useState('')
  const draft = R.pathOr(false, ['pageContext', 'frontmatter', 'draft'], other)
  const priv = R.pathOr(false, ['pageContext', 'frontmatter', 'private'], other)
  const isActive = view === VIEW_STATES.MENU_ACTIVE
  const props = isActive ? { css: menuActive } : {}

  let content = <Main {...other}>{children}</Main>
  if (checkWindowExists()) {
    // we are injecting ramda into the window variable
    window.R = R
    if (hidden && (draft || priv)) {
      const value = draft || priv
      const pw = typeof value === 'string' ? value : 'I love open source'
      const onClick = e => {
        e.preventDefault()
        setPass('')
        if (pw === currentPassword) setHidden(false)
      }
      content = (
        <Main {...other}>
          <PasswordProtected onKeyPress={e => (e.charCode === 13 ? onClick(e) : null)}>
            <h1>{draft ? 'Draft' : 'Private'}</h1>
            <PasswordField>
              <PasswordLabel htmlFor="password">Password:</PasswordLabel>
              <PasswordInput
                type="password"
                onChange={e => setPass(e.target.value)}
                defaultValue={currentPassword}
              />
              <PasswordButton onClick={onClick}>View</PasswordButton>
            </PasswordField>
          </PasswordProtected>
        </Main>
      )
    }
  }
  return (
    <section {...props} css={site} className="website">
      <SEO seo={seo} {...other} />
      <Navigation {...other} />
      {content}
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
