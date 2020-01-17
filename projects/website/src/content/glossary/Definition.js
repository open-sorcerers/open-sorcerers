import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { Box } from 'rebass'
import { pipe, replace, toLower } from 'ramda'
import { trace } from 'xtrace'

const slugLink = pipe(replace(/ /g, '-'), toLower, z => '/glossary/' + z, trace('output'))

export const Definition = props => {
  const { of: x, children, parent, pageContext } = props
  console.log('HEY PATH', props)
  const breadcrumbs = (
    <>
      <Link to="/glossary">Glossary</Link>
      {parent ? (
        <>
          {' | '}
          <Link to={slugLink(parent)}>{parent}</Link>
        </>
      ) : null}{' '}
      | <Link to={slugLink(x)}>{x}</Link>
    </>
  )
  return (
    <Box>
      <h2>{breadcrumbs}</h2>
      {children ? <p>{children}</p> : null}
    </Box>
  )
}

Definition.propTypes = {
  of: PropTypes.string,
  children: PropTypes.node,
  parent: PropTypes.string
}

export default Definition
