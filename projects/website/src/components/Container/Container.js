import React from 'react'
import PropTypes from 'prop-types'

import { StyledContainer, StyledContentContainer } from './styled'

export const Container = ({ children, setView, view, ...props }) => (
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

export const ContentContainer = ({ children, setView, view, ...props }) => (
  <StyledContentContainer {...{ ...props, setView, view }}>{children}</StyledContentContainer>
)

ContentContainer.propTypes = Container.propTypes
ContentContainer.defaultProps = {
  children: null,
  setView: () => {},
  view: ''
}

export default Container
