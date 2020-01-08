import { useStaticQuery, graphql } from 'gatsby'
export const getReviewsWithSummary = () =>
  useStaticQuery(graphql`
    query getReviewsWithSummary {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { keywords: { in: "review" } }
        }
      ) {
        nodes {
          frontmatter {
            author
            path
            title
            keywords
            glossary
            private
            draft
            reviewer
            link
            date
          }
          id
          timeToRead
          fileAbsolutePath
          tableOfContents
          excerpt(pruneLength: 420)
        }
      }
    }
  `)
