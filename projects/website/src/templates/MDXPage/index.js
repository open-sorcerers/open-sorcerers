import { graphql } from 'gatsby'

import { prefill } from '@components/pages/MDXPage'

export const MDXPage = prefill({})

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
