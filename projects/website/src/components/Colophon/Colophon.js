import React from 'react'
import PropTypes from 'prop-types'
import { concat, pathOr, ap, pipe } from 'ramda'
import { cutAfter } from '@utils/string'

import { AltColophon as Alt, StyledColophon, LinkWrapper } from './styled'

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
  const isHeader = props && props.variant && props.variant === 'header'
  const CC = isHeader ? Alt : StyledColophon

  const gh = data.githubLink.length > BLOBMASTER.length
  const hasContent = gh || data.author
  return (
    <CC hasContent={hasContent} className={props.variant}>
      {gh && (
        <LinkWrapper>
          {!isHeader && `See this page on `}
          <a title="This page on github" href={data.githubLink}>
            👁 Github
          </a>
        </LinkWrapper>
      )}
      {data.author && (
        <LinkWrapper>
          {!isHeader && `Content on this page written by `}
          <a href={`//github.com/${data.author}`}>😈 {data.author}</a>
        </LinkWrapper>
      )}
    </CC>
  )
}

Colophon.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node
}

export default Colophon
