import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
/* import preset from '@rebass/preset' */

import theme from '@styles/theme'

import { BaseCSS } from './BaseCSS'
import Picker from './Picker'

const Theme = ({ children }) => (
  <>
    <ThemeProvider theme={theme}>
      <Picker />
      <BaseCSS theme={theme} />
      {children}
    </ThemeProvider>
  </>
)

Theme.propTypes = {
  children: PropTypes.node.isRequired
}

export { Theme }
