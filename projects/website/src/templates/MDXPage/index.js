import React from 'react'
import PropTypes from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { Container } from '@components/Container'
import { Site } from '@components/Site'

export const MDXPage = ({ data, ...other }) => (
  <Site {...other}>
    <Container>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Container>
  </Site>
)

MDXPage.propTypes = { data: PropTypes.object.isRequired }

export const pageQuery = graphql`
  query MDXQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
  }
`

export default MDXPage