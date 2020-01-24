import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { pipe, replace, toLower } from 'ramda'

import { checkWindowExists } from '@utils/url'

import { StyledDefinition } from './styled'

const slugLink = pipe(replace(/ /g, '-'), toLower, z => '/glossary/' + z)

export const Definition = memo(props => {
  const { of: x, children, parent } = props
  let onGlossaryPage = false
  if (checkWindowExists()) {
    const loc = window.location.toString()
    onGlossaryPage = loc.includes('glossary') && loc.endsWith('glossary')
  }
  const breadcrumbs = (
    <>
      {!onGlossaryPage ? (
        <>
          <Link to="/glossary">Glossary</Link>
          {' | '}
        </>
      ) : null}
      {parent ? (
        <>
          <Link to={slugLink(parent)}>{parent}</Link>
          {' | '}
        </>
      ) : null}{' '}
      <Link to={slugLink(x)}>{x}</Link>
    </>
  )
  return (
    <StyledDefinition>
      <h2>{breadcrumbs}</h2>
      {children ? <p>{children}</p> : null}
    </StyledDefinition>
  )
})

Definition.propTypes = {
  of: PropTypes.string,
  children: PropTypes.node,
  parent: PropTypes.string
}

export default Definition
