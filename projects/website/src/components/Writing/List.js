import React from 'react'
import { Link } from 'gatsby'
import { includes, curry, sort, pipe, ap, pathOr, map } from 'ramda'
import PropTypes from 'prop-types'
import { getModulesWithSummary } from '@queries/modules-with-summary'
import { getReviewsWithSummary } from '@queries/reviews-with-summary'
import { getPostsWithSummary } from '@queries/posts-with-summary'

import { box } from '@utils/generic'

import {
  StyledReadingTime,
  ModuleToken,
  PostContent,
  FooterFirst,
  FooterLast,
  PostFooter,
  PostHeader,
  StyledListWrapper,
  StyledList,
  StyledPost,
  EntityLink,
  GlossaryLinks
} from './styled'

const isPrivate = pathOr(false, ['frontmatter', 'private'])
const isDraft = pathOr(false, ['frontmatter', 'draft'])
const isModule = pipe(pathOr([], ['frontmatter', 'keywords']), includes('module'))

const getLinkTitleAuthor = pipe(
  box,
  ap([
    pathOr('/404', ['frontmatter', 'path']),
    pathOr('???', ['frontmatter', 'title']),
    pathOr('someone', ['frontmatter', 'author']),
    pathOr([], ['frontmatter', 'glossary'])
  ])
)

const readingTime = curry((ch, tt, xx) =>
  new Array(Math.round(tt * 1.4 * (xx.length / 420)) + 1)
    .fill(ch)
    .map((z, i) => <span key={i}>{z}</span>)
)

const ReadingTime = ({ excerpt, timeToRead, icon }) => (
  <StyledReadingTime>{readingTime(icon, timeToRead, excerpt)}</StyledReadingTime>
)

ReadingTime.propTypes = {
  excerpt: PropTypes.string,
  timeToRead: PropTypes.number,
  icon: PropTypes.string
}

const Post = props => {
  const { timeToRead, excerpt } = props
  const [postLink, title, author, glossary] = getLinkTitleAuthor(props)
  return (
    <StyledPost>
      <PostHeader>
        <EntityLink to={postLink}>
          {isModule(props) ? <ModuleToken>📦</ModuleToken> : null}
          {title}
        </EntityLink>
      </PostHeader>
      <PostContent>{excerpt}</PostContent>
      <PostFooter>
        <FooterFirst>
          <em>@{author}</em>
        </FooterFirst>
        <FooterLast>
          <ReadingTime icon="◉" timeToRead={timeToRead} excerpt={excerpt} />
          <GlossaryLinks>
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
          </GlossaryLinks>
        </FooterLast>
      </PostFooter>
    </StyledPost>
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

const sortPosts = sort((aa, bb) => {
  const aPri = isPrivate(aa)
  const bPri = isPrivate(bb)
  const aDra = isDraft(aa)
  const bDra = isDraft(bb)

  if (aPri && !bPri) return 1
  if (aDra && !bDra) return 1
  if (bPri && !aPri) return -1
  if (bDra && !aDra) return -1

  return 0
})

export const List = ({ title, filter: ff }) => {
  const data =
    ff === 'modules'
      ? getModulesWithSummary()
      : ff === 'reviews'
      ? getReviewsWithSummary()
      : getPostsWithSummary()
  return (
    <StyledList>
      <h2>{title}</h2>
      <StyledListWrapper>
        {pipe(
          sortPosts,
          map(post => <Post key={post.id} {...post} />)
        )(data.allMdx.nodes)}
      </StyledListWrapper>
    </StyledList>
  )
}

List.propTypes = { title: PropTypes.string }

List.defaultProps = { title: 'Reading' }

export default List
