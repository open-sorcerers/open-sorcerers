import { graphql } from 'gatsby'

import { prefill } from '@components/pages/MDXPage'

export const MDXPage = prefill({
  className: 'default-page',
  maxWidth: '800px',
  margin: '0 auto'
})

export const pageQuery = graphql`
  query MDXQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
    currentBuildDate {
      currentDate
    }
  }
`

export default MDXPage
