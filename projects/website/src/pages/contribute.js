import React from 'react'
import { Router } from '@reach/router'

import { Site } from '@domain/Site'
import { Contribute } from '@routes/Contribute'
import { SubmitExample } from '@routes/Contribute/SubmitExample'
import { PrivateRoute } from '@routes/Private'

export const ContributePage = () => (
  <Site>
    <Router>
      <PrivateRoute path="/contribute/an-example" component={SubmitExample} />
      <Contribute path="/contribute" />
    </Router>
  </Site>
)

export default ContributePage
