import { useStaticQuery, graphql } from 'gatsby'

export const getPosts = () =>
  useStaticQuery(graphql`
    query getPosts {
      allSitePage(filter: { path: { regex: "/writing/" } }) {
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
    }
  `)
