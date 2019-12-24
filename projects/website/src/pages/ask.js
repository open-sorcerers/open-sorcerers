import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Router } from '@reach/router'
import { Site } from '@domain/Site'
import { Ask } from '@routes/Ask'

export const AskPage = ({ ...rest }) => (
  <Site
    {...rest}
    seo={{
      description: 'Ask the Open Sorcerers about your FP x JS x OSS questions!',
      keywords: [
        'ask',
        'question',
        'functional programming',
        'javascript',
        'open source',
        'meetup',
        'slack',
        'twitter'
      ]
    }}
  >
    <Router>
      <Ask path="/ask" />
    </Router>
  </Site>
)

export default AskPage
