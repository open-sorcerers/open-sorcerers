import React from 'react'
import PropTypes from 'prop-types'

import { StyledBadge, BadgeContent } from './styled'

export const Badge = ({ content, variant }) => (
  <StyledBadge variant={variant}>
    <BadgeContent variant={variant}>{content}</BadgeContent>
  </StyledBadge>
)

Badge.propTypes = {
  content: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  variant: PropTypes.string
}

export default Badge
