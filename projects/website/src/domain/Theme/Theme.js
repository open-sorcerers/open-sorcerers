import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
/* import preset from '@rebass/preset' */

import makeTheme from '@styles/theme'
import PALETTES from '@styles/palettes'

import { BaseCSS } from './BaseCSS'
import Picker from './Picker'

const Theme = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const palette = PALETTES[activeIndex]
  const theme = makeTheme(palette)
  const [activeTheme, setActiveTheme] = useState(theme)
  return (
    <>
      <ThemeProvider theme={activeTheme}>
        <Picker theme={activeTheme} setActiveTheme={setActiveTheme} />
        <BaseCSS theme={activeTheme} />
        {children}
      </ThemeProvider>
    </>
  )
}

Theme.propTypes = {
  children: PropTypes.node.isRequired
}

export { Theme }
