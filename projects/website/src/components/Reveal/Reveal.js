import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { StyledReveal } from './styled'

export const Reveal = ({ label, children }) => {
  const [visible, setVisible] = useState(false)
  return !visible ? (
    <StyledReveal
      onClick={() => {
        setVisible(true)
      }}
    >
      {label}
    </StyledReveal>
  ) : (
    children
  )
}

Reveal.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any),
  label: PropTypes.oneOfType([PropTypes.node, PropTypes.string])
}

Reveal.defaultProps = { label: 'Click to reveal!' }

export default Reveal
