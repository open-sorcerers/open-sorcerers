import React from 'react'
import PropTypes from 'prop-types'
import { concat, pipe, toLower, replace, pathOr } from 'ramda'

import { Colophon } from '@components/Colophon'

import { StyledPostHeader } from './styled'

const getTitle = pathOr('???', ['pageContext', 'frontmatter', 'title'])

const idify = pipe(toLower, replace(/ /g, '-'))

export const PostHeader = props => {
  const title = getTitle(props)
  return (
    <StyledPostHeader>
      <h1 id={idify(title)}>{title}</h1>
      <Colophon {...props} variant="header" />
    </StyledPostHeader>
  )
}

PostHeader.propTypes = {
  // whatever: PropTypes.string,
  // isWhatever: PropTypes.bool,
  children: PropTypes.node
}

export default PostHeader
