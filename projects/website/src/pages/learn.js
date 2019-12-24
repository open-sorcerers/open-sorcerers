import React from 'react'
import { Router } from '@reach/router'

import { Site, stateView } from '@domain/Site'
import { Learn } from '@routes/Learn'
import { ByReading } from '@routes/Learn/ByReading'

const Routes = props => {
  const state = stateView(props)
  return (
    <Router>
      <ByReading {...state} path="/learn/by-reading" />
      <Learn {...state} path="/learn" />
    </Router>
  )
}

export const LearnPage = ({ ...rest }) => (
  <Site {...rest}>
    <Routes />
  </Site>
)

export default LearnPage
