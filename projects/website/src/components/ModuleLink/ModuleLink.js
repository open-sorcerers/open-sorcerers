import React from 'react'
import PropTypes from 'prop-types'

import { map } from 'ramda'

import { StyledModuleLink } from './styled'

export const ModuleLinks = ({ children }) =>
  children.map((xxx, i) => (
    <StyledModuleLink id={i} href={`//npmjs.org/package/${xxx}`}>
      {xxx}
    </StyledModuleLink>
  ))

ModuleLinks.propTypes = {
  children: PropTypes.node
}

export default ModuleLinks
