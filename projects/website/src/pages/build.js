import React from 'react'
import { Router } from '@reach/router'

import { Site } from '@domain/Site'
import { Build } from '@routes/Build'
import { SubmitExample } from '@routes/Build/SubmitExample'
import { PrivateRoute } from '@routes/Private'

export const BuildPage = () => (
  <Site>
    <Router>
      <PrivateRoute path="/build/an-example" component={SubmitExample} />
      <Build path="/build" />
    </Router>
  </Site>
)

export default BuildPage
