import { graphql } from 'gatsby'

import { prefill } from '@components/pages/MDXPage'

const SeriesPage = prefill({
  className: 'series-page'
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
