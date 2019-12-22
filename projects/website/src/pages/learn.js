import React from 'react'
import { Router } from '@reach/router'
import { Site } from '@components/Site'
import { Learn } from '@components/Learn'
const seo = { title: 'Open Sorcerers' }

/* <ByReading path="/learn/by-reading" /> */
/* <ByPracticing path="/learn/by-practicing" /> */
export const LearnPage = ({ ...rest }) => (
  <Site seo={seo} {...rest}>
    <Router>
      <Learn path="/learn" />
    </Router>
  </Site>
)

export default LearnPage
