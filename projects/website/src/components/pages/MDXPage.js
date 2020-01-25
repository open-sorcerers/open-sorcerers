import React from 'react'
import PropTypes from 'prop-types'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { ContentContainer } from '@components/Container'
import { Colophon } from '@components/Colophon'
import { Site } from '@domain/Site'

export const prefill = prefilled => {
  const MDXPage = ({ data, ...other }) => {
    const props = { ...prefilled, ...other, siteData: data }
    // this allows for rendering of nested MDX imports
    return !data && props.children ? (
      <>{props.children}</>
    ) : (
      <Site {...props}>
        <ContentContainer>
          <Colophon {...props} variant="header" />
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </ContentContainer>
      </Site>
    )
  }
  MDXPage.propTypes = { data: PropTypes.object, children: PropTypes.node }
  return MDXPage
}
