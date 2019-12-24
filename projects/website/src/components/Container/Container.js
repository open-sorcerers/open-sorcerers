import React from 'react'
import PropTypes from 'prop-types'

import { StyledContainer } from './styled'

const Container = ({ children, maxWidth, setView, view }) =>
  console.log(setView, '>?<', view) || (
    <StyledContainer maxWidth={maxWidth}>{children}</StyledContainer>
  )

Container.propTypes = {
  children: PropTypes.node,
  maxWidth: PropTypes.number
}

Container.defaultProps = {
  children: null,
  maxWidth: 800
}

export { Container }
