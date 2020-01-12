import { graphql } from 'gatsby'

import { prefill } from '@components/pages/MDXPage'

const VerbPage = prefill({
  className: 'verb-page'
})

export const pageQuery = graphql`
  query VerbPage($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
    }
    currentBuildDate {
      currentDate
    }
  }
`

export default VerbPage
