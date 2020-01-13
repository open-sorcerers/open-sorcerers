import React from 'react'
import { Site } from '@domain/Site'
import { Container } from '@components/Container'
import { graphql } from 'gatsby'

import Readme from '../../README.md'

const seo = {
  title: 'Home'
}

const IndexPage = ({ data, ...other }) => {
  console.log('DATA', data)
  return (
    <Site seo={seo} {...other} siteData={data}>
      <Container>
        <Readme />
      </Container>
    </Site>
  )
}

export const pageQuery = graphql`
  query homePage {
    currentBuildDate {
      currentDate
    }
  }
`

export default IndexPage
