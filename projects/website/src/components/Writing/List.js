import React from 'react'
import { Box } from 'rebass'
import { Link } from 'gatsby'
import { split, pipe, ap, pathOr, map } from 'ramda'
import PropTypes from 'prop-types'
import { getPostsWithSummary } from '@queries/posts-with-summary'

import { box } from '@utils/generic'

import { EntityLink, Keywords } from './styled'

const getLinkTitleAuthor = pipe(
  box,
  ap([
    pathOr('/404', ['frontmatter', 'path']),
    pathOr('???', ['frontmatter', 'title']),
    pathOr('someone', ['frontmatter', 'author']),
    pipe(pathOr('', ['frontmatter', 'keywords']), split(','))
  ])
)

const Post = props => {
  const { timeToRead, excerpt } = props
  const [postLink, title, author, keywords] = getLinkTitleAuthor(props)
  return (
    <Box>
      <Box as="header">
        <EntityLink to={postLink}>{title}</EntityLink>
        <em>by @{author}</em>
      </Box>
      <Box as="blockquote">{excerpt}</Box>
      <Box as="footer">
        <span>{timeToRead + 5} minutes reading</span>
        <Keywords>
          {map(
            item => (
              <>
                <Link key={item} to={`/glossary/${item}`}>
                  {item}
                </Link>
              </>
            ),
            keywords
          )}
        </Keywords>
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
      <h2>
        <Link to="/build">By Reading</Link>
      </h2>
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
