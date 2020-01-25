import React from 'react'
import PropTypes from 'prop-types'

import { StyledModuleLink } from './styled'

export const ModuleLinks = ({ children }) =>
  children.map((xxx, i) => (
    <StyledModuleLink key={i} href={`//npmjs.org/package/${xxx}`}>
      {xxx}
    </StyledModuleLink>
  ))

ModuleLinks.propTypes = {
  children: PropTypes.node
}

export default ModuleLinks
