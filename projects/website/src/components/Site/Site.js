import React from 'react'
import PropTypes from 'prop-types'

import { Theme } from '@components/Theme'
import { Navigation } from '@components/Navigation'
import { Footer } from '@components/Footer'
import { SEO } from './SEO'
import { Main } from './styled'

const Site = ({ children, seo, ...other }) => (
  <Theme>
    <SEO seo={seo} {...other} />
    <Navigation {...other} />
    <Main>{children}</Main>
    <Footer {...other} />
  </Theme>
)

Site.propTypes = {
  children: PropTypes.node,
  seo: SEO.propTypes.seo
}

Site.defaultProps = {
  children: null,
  seo: {}
}

export { Site }
