import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { ContentContainer } from '@components/Container'
import { Site } from '@domain/Site'

export const MDXPage = ({ data, ...other }) =>
  !data && other.children ? (
    <>{other.children}</>
  ) : (
    <Site {...other}>
      <ContentContainer>
        <MDXRenderer>{data.mdx.body}</MDXRenderer>
      </ContentContainer>
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
