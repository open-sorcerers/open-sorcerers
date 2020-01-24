import React from 'react'
import { Link } from 'gatsby'
import { MDXRenderer as MDX } from 'gatsby-plugin-mdx'
import {
  filter,
  join,
  identity as I,
  always as K,
  ifElse,
  max,
  min,
  range,
  includes,
  curry,
  sort,
  pipe,
  ap,
  pathOr,
  map
} from 'ramda'
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

const checkIsPrivate = pathOr(false, ['frontmatter', 'private'])
const checkIsDraft = pathOr(false, ['frontmatter', 'draft'])
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

/* const readingTime = curry((ch, tt, xx) => */
/* new Array(Math.round(tt * 1.4 * (xx.length / 420)) + 1) */
const readingTime = curry((ch, tt) =>
  pipe(
    max(1),
    min(5),
    range(0),
    map(K(ch)),
    join(''),
    ifElse(
      z => z.length === 5,
      z => z + '+',
      I
    ),
    xx => <>{xx}</>
  )(tt)
)

const ReadingTime = ({ timeToRead, icon }) => (
  <StyledReadingTime>{readingTime(icon, timeToRead)}</StyledReadingTime>
)

ReadingTime.propTypes = {
  excerpt: PropTypes.string,
  timeToRead: PropTypes.number,
  icon: PropTypes.string
}

const truncate = ifElse(
  includes('github.com'),
  z => {
    const i = z.indexOf('github.com')
    const main = z.slice(i + 11)
    return main.slice(0, main.indexOf('/'))
  },
  I
)

const Post = props => {
  const { excerpt } = props
  const zzerp = pathOr(excerpt, ['frontmatter', 'excerpt'], props)
  const isMarkdownExcerpt = pathOr(false, ['frontmatter', 'markdownExcerpt'], props)
  const paragraphs = pathOr(1, ['wordCount', 'paragraphs'], props)
  const isDraft = checkIsDraft(props)
  const isPrivate = checkIsPrivate(props)
  const [postLink, title, author, glossary, link] = getLinkTitleAuthor(props)
  const isGlossary = isGlossaryItem(props)
  return isPrivate || isDraft ? null : (
    <StyledPost {...{ isDraft, isPrivate }}>
      <PostHeader>
        <EntityLink to={postLink}>{title}</EntityLink>
        {isModule(props) ? <ModuleToken>📦</ModuleToken> : null}
      </PostHeader>
      <PostContent>{isMarkdownExcerpt ? <MDX>{zzerp}</MDX> : zzerp}</PostContent>
      <PostFooter {...{ isDraft, isPrivate }}>
        <FooterFirst>
          {!isGlossary && (
            <em>{link ? <a href={link}>{truncate(link)}</a> : <span>@{author}</span>}</em>
          )}
        </FooterFirst>
        <FooterLast>
          <ReadingTime icon="¶" timeToRead={paragraphs} excerpt={excerpt} />
        </FooterLast>
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
  const aPri = checkIsPrivate(aa)
  const bPri = checkIsPrivate(bb)
  const aDra = checkIsDraft(aa)
  const bDra = checkIsDraft(bb)
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

export const List = ({ title, filter: ff, more = false, customFilter = I }) => {
  const data = getMDXWithSummary()
  const posts = data[ff || 'posts'].nodes
  return (
    posts.length > 0 && (
      <StyledList>
        <h2>{more ? <Link to={more}>{title}</Link> : title}</h2>
        <StyledListWrapper>
          {pipe(
            sortPosts,
            filter(customFilter),
            map(post => <Post key={post.id} {...post} />)
          )(posts)}
        </StyledListWrapper>
      </StyledList>
    )
  )
}

List.propTypes = {
  title: PropTypes.string,
  filter: PropTypes.string,
  more: PropTypes.string,
  customFilter: PropTypes.func
}

List.defaultProps = { title: 'Reading' }

export default List
