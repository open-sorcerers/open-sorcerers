import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Box } from 'rebass'
import { map } from 'ramda'

import { Li } from '@styles/List'
import { ContentContainer } from '@components/Container'
import { getPosts } from '@queries/posts'

const waysOfLearning = [
  /* ['/learn/by-reading', 'By reading'], */
  ['/learn/by-practicing', 'By practicing'],
  ['/learn/by-doing', 'By doing']
]

export const Learn = () => {
  const data = getPosts()
  return (
    <ContentContainer>
      <h1 fontSize={['2rem', '3rem', '4rem']}>Learn</h1>
      <Box as="ul">
        <Li as="li">
          <Link to="/learn/by-reading">By reading</Link>
          <Box as="ul">
            {map(
              node => (
                <Li as="li" key={node.id}>
                  <Link to={node.path}>{node.context.frontmatter.title}</Link> by{' '}
                  <Link to={'/contributors/' + node.context.frontmatter.author}>
                    @{node.context.frontmatter.author}
                  </Link>
                </Li>
              ),
              data.allSitePage.nodes
            )}
          </Box>
        </Li>
        {map(
          ([route, path]) => (
            <Li as="li" key={route}>
              <Link to={route}>{path}</Link>
            </Li>
          ),
          waysOfLearning
        )}
      </Box>
    </ContentContainer>
  )
}

Learn.propTypes = {
  path: PropTypes.string.isRequired
}

Learn.defaultProps = {}

export default Learn
