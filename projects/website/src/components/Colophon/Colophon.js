import React from 'react'
import PropTypes from 'prop-types'
import { concat, lt, curry, slice, indexOf, ifElse, pathOr, ap, pipe } from 'ramda'
import { trace } from 'xtrace'

import { StyledColophon, LinkGithub, LinkAuthor } from './styled'

/*
Preserve for comparisons later:
const cutInDirectionBy = curry((direction, and, lookup, str) => {
  const idx = str.indexOf(lookup)
  if (idx > -1) {
    return direction ? str.slice(0, idx + and) : str.slice(idx + and, Infinity)
  }
  return str
})
*/

const cutInDirectionBy = curry((direction, and, lookup, str) =>
  pipe(
    trace('input'),
    indexOf(lookup),
    trace('index'),
    ifElse(
      lt(-1),
      // prettier is wrong about how to format this
      direction
        ? // so comments
          z => slice(0, z + and, str)
        : // will force it
          z => slice(z + and, Infinity, str),
      () => str
    )
  )(str)
)
const cutBeforeBy = cutInDirectionBy(true)
const cutAfterBy = cutInDirectionBy(false)
const cutBefore = cutBeforeBy(0)
const cutAfter = cutAfterBy(0)

const BLOBMASTER = 'https://github.com/open-sorcerers/open-sorcerers/blob/master/'
const getSourcePath = pipe(
  pathOr('', ['pageContext', 'fileAbsolutePath']),
  cutAfter('projects'),
  concat(BLOBMASTER)
)
const getKeywords = pathOr([], ['pageContext', 'frontmatter', 'keywords'])
const getDatePublished = pathOr(false, ['pageContext', 'frontmatter', 'datePublished'])
const getDateEdited = pathOr(false, ['pageContext', 'frontmatter', 'dateEdited'])
const getAuthor = pathOr(false, ['pageContext', 'frontmatter', 'author'])

const getAllTheData = pipe(
  z => [z],
  ap([getSourcePath, getKeywords, getDatePublished, getDateEdited, getAuthor]),
  ([githubLink, keywords, datePublished, dateEdited, author]) => ({
    githubLink,
    keywords,
    datePublished,
    dateEdited,
    author
  })
)

export const Colophon = props => {
  const data = getAllTheData(props)

  const gh = data.githubLink.length > BLOBMASTER.length
  const hasContent = gh || data.author
  return (
    <StyledColophon hasContent>
      {gh && (
        <LinkGithub>
          See this page on{' '}
          <a title="This page on github" href={data.githubLink}>
            👁 Github
          </a>
        </LinkGithub>
      )}
      {data.author && (
        <LinkAuthor>
          Content on this page written by{' '}
          <a href={`//github.com/${data.author}`}>😈 {data.author}</a>
        </LinkAuthor>
      )}
    </StyledColophon>
  )
}

Colophon.propTypes = {
  // whatever: PropTypes.string,
  // isWhatever: PropTypes.bool,
  children: PropTypes.node
}

export default Colophon
