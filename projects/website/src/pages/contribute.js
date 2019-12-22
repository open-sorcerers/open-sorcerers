import React from 'react'
import { Router } from '@reach/router'
import { Site } from '@components/Site'
import { Contribute } from '@components/Contribute'
import { PrivateRoute } from '@components/PrivateRoute'
import { SubmitExample } from '@components/Contribute/SubmitExample'
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
