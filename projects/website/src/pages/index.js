import React from 'react'
import PropTypes from 'prop-types'
import { Site } from '@domain/Site'
import { Container } from '@components/Container'
import { graphql } from 'gatsby'

import Readme from '../../README.md'

const seo = {
  title: 'Home'
}

const IndexPage = ({ data, ...other }) => {
  return (
    <Site seo={seo} {...other} siteData={data}>
      <Container>
        <Readme />
      </Container>
    </Site>
  )
}
IndexPage.propTypes = {
  data: PropTypes.object
}

export const pageQuery = graphql`
  query homePage {
    currentBuildDate {
      currentDate
    }
  }
`

export default IndexPage
