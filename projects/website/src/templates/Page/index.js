import React from 'react'
import PropTypes from 'prop-types'

import { Container } from '@components/Container'
import { Site } from '@domain/Site'

const Page = ({ children, ...other }) => {
  return (
    <Site {...other}>
      <Container>{children}</Container>
    </Site>
  )
}

Page.propTypes = {
  children: PropTypes.node
}

Page.defaultProps = {
  children: null
}

export default Page
