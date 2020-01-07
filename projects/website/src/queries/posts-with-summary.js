import { useStaticQuery, graphql } from 'gatsby'

export const getPostsWithSummary = () =>
  useStaticQuery(graphql`
    query getPostsWithSummary {
      allMdx(filter: { fileAbsolutePath: { regex: "/posts/" } }) {
        nodes {
          frontmatter {
            author
            path
            title
            glossary
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
