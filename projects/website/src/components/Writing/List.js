import React from 'react'
import { Box } from 'rebass'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { getPostsWithSummary } from '@queries/posts-with-summary'
import { map } from 'ramda'
import styled from '@emotion/styled'
import * as ℂ from '@styles/colors'
import { checkWindowExists } from '@utils/url'

const Glossary = styled(Box)`
  background-color: ${ℂ.secondary};
`

const Post = ({ frontmatter, timeToRead, excerpt, tableOfContents }) =>
  console.log('tableCofContents', tableOfContents) || (
    <Box>
      <Box as="header">
        <Link to={frontmatter.path}>{frontmatter.title}</Link>
        <em>by @{frontmatter.author}</em>
      </Box>
      <Box as="blockquote">{excerpt}</Box>
      <Box as="footer">
        <span>{timeToRead + 5} minutes reading</span>
        <Glossary>
          {map(
            item => (
              <>
                <Link
                  key={item.url}
                  to={`/glossary/${item.url.replace('#', '').replace('-functions', '')}`}
                >
                  {item.title}
                </Link>
              </>
            ),
            tableOfContents.items
          )}
        </Glossary>
      </Box>
    </Box>
  )
Post.propTypes = {
  frontmatter: PropTypes.shape({
    author: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  timeToRead: PropTypes.number.isRequired,
  excerpt: PropTypes.string.isRequired,
  tableOfContents: PropTypes.object
}

export const List = () => {
  if (!checkWindowExists()) return null
  const data = getPostsWithSummary()
  return (
    <Box>
      <h1>Learn</h1>
      <h2>By Reading</h2>
      <>
        {map(
          post => (
            <Post key={post.id} {...post} />
          ),
          data.allMdx.nodes
        )}
      </>
    </Box>
  )
}

List.propTypes = {}

List.defaultProps = {}

export default List
