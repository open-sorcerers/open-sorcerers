import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { map } from 'ramda'

import { Container } from '@components/Container'

const waysOfLearning = [
  /* ['/learn/by-reading', 'By reading'], */
  ['/learn/by-practicing', 'By practicing'],
  ['/learn/by-doing', 'By doing']
]

export const Learn = () => {
  const data = useStaticQuery(graphql`
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
  return (
    <Container>
      <h1>Learn</h1>
      <ul>
        <li>
          <Link to="/learn/by-reading">By reading</Link>
          <ul>
            {map(
              node => (
                <li key={node.id}>
                  <Link to={node.path}>{node.context.frontmatter.title}</Link> by{' '}
                  <Link to={'/contributors/' + node.context.frontmatter.author}>
                    @{node.context.frontmatter.author}
                  </Link>
                </li>
              ),
              data.allSitePage.nodes
            )}
          </ul>
        </li>
        {map(
          ([route, path]) => (
            <li key={route}>
              <Link to={route}>{path}</Link>
            </li>
          ),
          waysOfLearning
        )}
      </ul>
    </Container>
  )
}

Learn.propTypes = {
  path: PropTypes.string.isRequired
}

Learn.defaultProps = {}

export default Learn
