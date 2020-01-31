import React from 'react'
import PropTypes from 'prop-types'
/* import { Link } from '@elements/Link' */
/* import { MDXProvider } from '@mdx-js/react' */
import { MDXRenderer } from 'gatsby-plugin-mdx'

import { ContentContainer } from '@components/Container'
import { PostHeader } from '@components/PostHeader'
import { Site } from '@domain/Site'

export const prefill = prefilled => {
  const Content = ({ data, ...other }) => (
    <ContentContainer>
      <PostHeader {...other} />
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </ContentContainer>
  )
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
        <Content {...props} data={data} />
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
