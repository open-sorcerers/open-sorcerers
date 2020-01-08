import { useStaticQuery, graphql } from 'gatsby'
export const getModulesWithSummary = () =>
  useStaticQuery(graphql`
    query getModulesWithSummary {
      allMdx(
        filter: {
          fileAbsolutePath: { regex: "/posts/" }
          frontmatter: { keywords: { in: "module", nin: "review" } }
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
