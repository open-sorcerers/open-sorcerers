import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { BaseCSS } from './BaseCSS'

const system = { ...preset }

const Theme = ({ children }) => (
  <ThemeProvider theme={system}>
    <>
      <BaseCSS />
      {children}
    </>
  </ThemeProvider>
)

Theme.propTypes = {
  children: PropTypes.node.isRequired
}

export { Theme }
