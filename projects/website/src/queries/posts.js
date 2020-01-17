import { useStaticQuery, graphql } from 'gatsby'

export const getPosts = () =>
  useStaticQuery(graphql`
    query getPosts {
      allSitePage(filter: { context: { fileAbsolutePath: { regex: "/posts/" } } }) {
        nodes {
          id
          path
          matchPath
          component
          componentPath
          context {
            frontmatter {
              author
              path
              title
            }
            fileAbsolutePath
          }
        }
      }
      currentBuildDate {
        currentDate
      }
    }
  `)
