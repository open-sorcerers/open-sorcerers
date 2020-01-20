import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'
import { pathOr, propOr } from 'ramda'
import Helmet from 'react-helmet'

const SEO = props => {
  const pathname = pathOr('', ['location', 'pathname'], props)
  const frontmatter = pathOr({}, ['pageContext', 'frontmatter'], props)
  const excerpt = pathOr(false, ['pageContext', 'excerpt'], props)
  if (frontmatter.excerpt) {
    frontmatter.description = frontmatter.excerpt.replace(/\n/g, ' ')
  } else if (excerpt) {
    frontmatter.description = excerpt
  }
  const seo = propOr({}, 'seo', props)

  const {
    site: { siteMetadata }
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
          basepath
          description
          keywords
          type
          image
        }
      }
    }
  `)
  const merged = {
    ...siteMetadata,
    ...seo,
    ...frontmatter
  }

  const { name, basepath, title, description, keywords = [], type, image } = merged
  const url = `${basepath}${pathname}`

  const kwords = (keywords || ['Open Sorcerers']).join(', ')

  return (
    <Helmet titleTemplate={`%s • ${name}`} defaultTitle={name}>
      <html lang="en" />

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={kwords} />
      <script type="text/javascript" src="modernizr.js" />
      <link rel="canonical" href={url} />
      <link rel="stylesheet" href="https://use.typekit.net/mhh6emz.css" />
      <meta property="og:site_name" content={name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
    </Helmet>
  )
}

SEO.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  pageContext: PropTypes.shape({
    frontmatter: PropTypes.object
  }),
  seo: PropTypes.shape({
    name: PropTypes.string,
    basepath: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string,
    image: PropTypes.string
  }),
  excerpt: PropTypes.string
}

SEO.defaultProps = {
  pageContext: {},
  seo: {}
}

export { SEO }
