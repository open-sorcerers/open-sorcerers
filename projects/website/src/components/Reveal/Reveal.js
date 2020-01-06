import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const Reveal = ({ children }) => {
  const [visible, setVisible] = useState(false)
  return !visible ? (
    <div
      onClick={() => {
        setVisible(true)
      }}
    >
      Click to reveal!
    </div>
  ) : (
    children
  )
}

Reveal.propTypes = { children: PropTypes.arrayOf(PropTypes.any) }

export default Reveal
