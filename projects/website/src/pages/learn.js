import React from 'react'
import { Router } from '@reach/router'
import { Site } from '@domain/Site'
import { Learn } from '@routes/Learn'
import { ByReading } from '@routes/Learn/ByReading'
const seo = { title: 'Open Sorcerers' }

/* <ByPracticing path="/learn/by-practicing" /> */
export const LearnPage = ({ ...rest }) => (
  <Site seo={seo} {...rest}>
    <Router>
      <ByReading path="/learn/by-reading" />
      <Learn path="/learn" />
    </Router>
  </Site>
)

export default LearnPage
