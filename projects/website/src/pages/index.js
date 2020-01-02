import React from 'react'
import { Site } from '@domain/Site'
import { Container } from '@components/Container'

import Readme from '../../README.md'

const seo = {
  title: 'Home'
}

const IndexPage = ({ ...other }) => {
  return (
    <Site seo={seo} {...other}>
      <Container>
        <Readme />
      </Container>
    </Site>
  )
}

export default IndexPage
