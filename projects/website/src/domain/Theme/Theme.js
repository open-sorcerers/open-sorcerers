import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

import { PALETTE as core, EL as elements, UI as ui, AREA as area } from '@styles/colors'

const colors = { core, elements, ui, area }

import { BaseCSS } from './BaseCSS'

const system = { ...preset, colors }
console.log('DESIGN SYSTEM', system)

const Theme = ({ children }) => (
  <>
    <BaseCSS />
    <ThemeProvider theme={system}>{children}</ThemeProvider>
  </>
)

Theme.propTypes = {
  children: PropTypes.node.isRequired
}

export { Theme }
