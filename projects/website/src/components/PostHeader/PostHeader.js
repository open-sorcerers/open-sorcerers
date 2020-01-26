import React from 'react'
import PropTypes from 'prop-types'
import { pipe, toLower, replace, pathOr } from 'ramda'

import { Colophon } from '@components/Colophon'

import { StyledPostHeader } from './styled'

const getTitle = pathOr('???', ['pageContext', 'frontmatter', 'title'])

const idify = pipe(toLower, replace(/ /g, '-'))
const notInBlacklist = pipe(idify, z => !['learn', 'build', 'talk'].includes(z))

export const PostHeader = props => {
  const title = getTitle(props)
  return (
    <StyledPostHeader>
      <h1 id={idify(title)}>{title}</h1>
      {notInBlacklist(title) && <Colophon {...props} variant="header" />}
    </StyledPostHeader>
  )
}

PostHeader.propTypes = {
  // whatever: PropTypes.string,
  // isWhatever: PropTypes.bool,
  children: PropTypes.node
}

export default PostHeader
