import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'emotion-theming'
import { concat, pathOr, ap, pipe, when, is } from 'ramda'
import { cutAfter } from '@utils/string'

import LogoGH from '@assets/logo-github.svg'

import { AltColophon as Alt, StyledColophon, AltWrapper, LinkWrapper } from './styled'

const BLOBMASTER = 'https://github.com/open-sorcerers/open-sorcerers/blob/master/'
const getSourcePath = pipe(
  pathOr('', ['pageContext', 'fileAbsolutePath']),
  cutAfter('projects'),
  concat(BLOBMASTER)
)
const getKeywords = pathOr([], ['pageContext', 'frontmatter', 'keywords'])

const parseDate = when(
  is(String),
  pipe(
    z => new Date(z),
    d => d.toLocaleDateString()
  )
)
const getDatePublished = pipe(
  pathOr(false, ['pageContext', 'frontmatter', 'datePublished']),
  parseDate
)
const getDateEdited = pipe(pathOr(false, ['pageContext', 'frontmatter', 'dateEdited']), parseDate)
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

export const Colophon = withTheme(props => {
  const data = getAllTheData(props)
  const isHeader = props && props.variant && props.variant === 'header'
  const CC = isHeader ? Alt : StyledColophon
  const LW = isHeader ? AltWrapper : LinkWrapper
  /* const LW = AltWrapper */
  const gh = data.githubLink.length > BLOBMASTER.length
  const hasContent = gh || data.author || data.datePublished || data.dateEdited
  return (
    <CC hasContent={hasContent} className={props.variant}>
      {data.datePublished && (
        <LW variant="date" className="date">
          <strong>Published:</strong> {data.datePublished}
        </LW>
      )}
      {data.dateEdited && (
        <LW variant="date" className="date">
          <strong>Last edited:</strong> {data.dateEdited}
        </LW>
      )}
      {data.author && (
        <LW variant="author" className="author">
          {isHeader ? `By ` : 'Content by '}
          <a href={`//github.com/${data.author}`}>{data.author}</a>
        </LW>
      )}
      {gh && (
        <LW className="source">
          {!isHeader && `See this page on `}
          <a title="This page on github" href={data.githubLink}>
            {isHeader ? <LogoGH /> : `Github`}
          </a>
        </LW>
      )}
    </CC>
  )
})

Colophon.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node
}

export default Colophon
