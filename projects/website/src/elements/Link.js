import React from 'react'
import PropTypes from 'prop-types'
import { Link as GatsbyLink } from 'gatsby'
import styled from '@emotion/styled'

import { link } from './styled'

export const Link = props => {
  const { to, href, children, ...rest } = props
  const passed = { [to ? 'to' : 'href']: to || href, ...rest }
  const SorceryLink = to ? styled(GatsbyLink)(link) : styled.a(link)
  return <SorceryLink {...passed}>{children}</SorceryLink>
}

Link.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node
}

export default Link
