import React from 'react'
import { Box } from 'rebass'
import { Link } from 'gatsby'
import { split, pipe, ap, pathOr, map } from 'ramda'
import PropTypes from 'prop-types'
import { getPostsWithSummary } from '@queries/posts-with-summary'
import { trace } from 'xtrace'

import styled from '@emotion/styled'
import * as ℂ from '@styles/colors'
import { checkWindowExists } from '@utils/url'
import { box } from '@utils/generic'

const Glossary = styled(Box)`
  background-color: ${ℂ.secondary};
`

const getLinkTitleAuthor = pipe(
  box,
  ap([
    pathOr('/404', ['frontmatter', 'path']),
    pathOr('???', ['frontmatter', 'title']),
    pathOr('someone', ['frontmatter', 'author']),
    pipe(
      trace('hey buddy'),
      pathOr('', ['frontmatter', 'glossary']),
      trace('important thing is that you are really loud'),
      split(',')
    )
  ])
)

const Post = props => {
  const { timeToRead, excerpt } = props
  const [postLink, title, author, glossary] = getLinkTitleAuthor(props)
  console.log('TOC TOC', glossary)
  return (
    <Box>
      <Box as="header">
        <Link to={postLink}>{title}</Link>
        <em>by @{author}</em>
      </Box>
      <Box as="blockquote">{excerpt}</Box>
      <Box as="footer">
        <span>{timeToRead + 5} minutes reading</span>
        <Glossary>
          {map(
            item => (
              <>
                <Link key={item} to={`/glossary/${item}`}>
                  {item}
                </Link>
              </>
            ),
            glossary
          )}
        </Glossary>
      </Box>
    </Box>
  )
}
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
