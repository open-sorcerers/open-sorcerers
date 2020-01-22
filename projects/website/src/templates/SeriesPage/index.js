import { graphql } from 'gatsby'

import { prefill } from '@components/pages/MDXPage'

const SeriesPage = prefill({
  className: 'series-page',
  maxWidth: 1024
})

export const pageQuery = graphql`
  query SeriesPage($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
    currentBuildDate {
      currentDate
    }
  }
`

export default SeriesPage
