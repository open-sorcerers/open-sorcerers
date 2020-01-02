import React from 'react'
import PropTypes from 'prop-types'

import { StyledContainer } from './styled'

const Container = ({ children, setView, view, ...props }) => (
  <StyledContainer {...{ ...props, setView, view }}>{children}</StyledContainer>
)

Container.propTypes = {
  children: PropTypes.node,
  setView: PropTypes.func,
  view: PropTypes.string,
  maxWidth: PropTypes.number
}

Container.defaultProps = {
  children: null,
  maxWidth: 800,
  setView: () => {},
  view: ''
}

export { Container }
