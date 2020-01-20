import { useStaticQuery, graphql } from 'gatsby'

// export const getContributors = () => {}

//*
export const getContributors = () =>
  useStaticQuery(graphql`
    query getContributors {
      allGitHubContributor {
        nodes {
          id
          name
          avatarUrl
          login
          contributions
          url
        }
        distinct(field: id)
      }
      currentBuildDate {
        currentDate
      }
    }
  `)
// */
