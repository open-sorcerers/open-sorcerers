import React from 'react'
import PropTypes from 'prop-types'
/* import { Link } from '@elements/Link' */
/* import { MDXProvider } from '@mdx-js/react' */
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { ContentContainer } from '@components/Container'
import { PostHeader } from '@components/PostHeader'
import { Site } from '@domain/Site'

export const prefill = prefilled => {
  const MDXPage = ({ data, ...other }) => {
    const props = { ...prefilled, ...other, siteData: data }
    const { id, className } = props
    const over = { id, className }
    /* const components = { a: Link } */
    /* <MDXProvider components={components}> */
    /* </MDXProvider> */
    // this allows for rendering of nested MDX imports
    return !data && props.children ? (
      <div {...over}>{props.children}</div>
    ) : (
      <Site {...props}>
        <ContentContainer>
          <PostHeader {...props} />
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </ContentContainer>
      </Site>
    )
  }
  MDXPage.propTypes = {
    data: PropTypes.object,
    children: PropTypes.node,
    id: PropTypes.string,
    className: PropTypes.string
  }
  return MDXPage
}
