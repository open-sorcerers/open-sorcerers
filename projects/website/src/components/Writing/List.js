import React from 'react'
import { Link } from 'gatsby'
import { includes, curry, sort, pipe, ap, pathOr, map } from 'ramda'
import PropTypes from 'prop-types'
import { getMDXWithSummary } from '@queries/posts-with-summary'

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
const isGlossaryItem = pipe(pathOr('', ['frontmatter', 'path']), includes('glossary'))

const getLinkTitleAuthor = pipe(
  box,
  ap([
    pathOr('/404', ['frontmatter', 'path']),
    pathOr('???', ['frontmatter', 'title']),
    pathOr('someone', ['frontmatter', 'author']),
    pathOr([], ['frontmatter', 'glossary']),
    pathOr(false, ['frontmatter', 'link'])
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
  console.log('RPOPORPRO', props)
  const { timeToRead, excerpt } = props
  const [postLink, title, author, glossary, link] = getLinkTitleAuthor(props)
  const isGlossary = isGlossaryItem(props)
  return (
    <StyledPost>
      <PostHeader>
        <EntityLink to={postLink}>{title}</EntityLink>
        {isModule(props) ? <ModuleToken>📦</ModuleToken> : null}
      </PostHeader>
      <PostContent>{excerpt}</PostContent>
      <PostFooter>
        <FooterFirst>
          {!isGlossary && <em>{link ? <a href={link}>{link}</a> : <span>@{author}</span>}</em>}
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
  const aGlo = isGlossaryItem(aa)
  const bGlo = isGlossaryItem(bb)

  if (aPri && !bPri) return 1
  if (aDra && !bDra) return 1
  if (bPri && !aPri) return -1
  if (bDra && !aDra) return -1
  if (aGlo && bGlo) {
    return aa.frontmatter.title > bb.frontmatter.title ? 1 : -1
  }

  return 0
})

export const List = ({ title, filter: ff }) => {
  const data = getMDXWithSummary()
  return (
    <StyledList>
      <h2>{title}</h2>
      <StyledListWrapper>
        {pipe(
          sortPosts,
          map(post => <Post key={post.id} {...post} />)
        )(data[ff || 'posts'].nodes)}
      </StyledListWrapper>
    </StyledList>
  )
}

List.propTypes = { title: PropTypes.string, filter: PropTypes.string }

List.defaultProps = { title: 'Reading' }

export default List
