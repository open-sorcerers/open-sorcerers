import React from 'react'
import { Router } from '@reach/router'
import { Site } from '@domain/Site'
import { Contribute } from '@routes/Contribute'
import { SubmitExample } from '@routes/Contribute/SubmitExample'
import { PrivateRoute } from '@routes/Private'
const seo = { title: 'Open Sorcerers' }

/* <ByReading path="/Contribute/by-reading" /> */
/* <ByPracticing path="/Contribute/by-practicing" /> */
export const ContributePage = ({ ...rest }) => (
  <Site seo={seo} {...rest}>
    <Router>
      <PrivateRoute path="/contribute/an-example" component={SubmitExample} />
      <Contribute path="/contribute" />
    </Router>
  </Site>
)

export default ContributePage
