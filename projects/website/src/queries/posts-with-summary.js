import { useStaticQuery, graphql } from 'gatsby'

export const getPostsWithSummary = () =>
  useStaticQuery(graphql`
    query getPostsWithSummary {
      allMdx(
        filter: {
          frontmatter: { keywords: { nin: ["module", "review"] } }
          fileAbsolutePath: { regex: "/posts/" }
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
