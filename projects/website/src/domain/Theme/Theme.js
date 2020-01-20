import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import preset from '@rebass/preset'

/* import { PALETTE as core, EL as elements, UI as ui, AREA as area } from '@styles/colors' */

/* import { ui, area, el, */

import { BaseCSS } from './BaseCSS'

/* const colors = { core, elements, ui, area } */

const system = { ...preset }

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
