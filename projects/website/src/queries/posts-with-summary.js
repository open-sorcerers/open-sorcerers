import { useStaticQuery, graphql } from 'gatsby'

export const getPostsWithSummary = () =>
  useStaticQuery(graphql`
    query getPostsWithSummary {
      allMdx {
        nodes {
          frontmatter {
            path
            author
          }
          id
          timeToRead
          fileAbsolutePath
          excerpt(pruneLength: 120)
        }
      }
    }
  `)
