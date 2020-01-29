import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import { checkWindowExists } from '@utils/url'
/* import preset from '@rebass/preset' */

import makeTheme from '@styles/theme'
import PALETTES from '@styles/palettes'

import { BaseCSS } from './BaseCSS'
import Picker from './Picker'

const Theme = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const palette = PALETTES[activeIndex]
  const setIndex = x => {
    const index = (activeIndex + x) % PALETTES.length
    setActiveIndex(index)
    const active = makeTheme(PALETTES[index])
    setActiveTheme(active)
    if (checkWindowExists()) {
      window.localStorage.setItem('theme', JSON.stringify(active))
    }
  }
  let theme = makeTheme(palette)
  useEffect(() => {
    try {
      console.log('checking theme')
      theme = JSON.parse(window.localStorage.getItem('theme'))
    } catch (e) {
      theme = makeTheme(palette)
    }
  })
  const [activeTheme, setActiveTheme] = useState(theme)
  return (
    <>
      <ThemeProvider theme={activeTheme}>
        <BaseCSS theme={activeTheme} />
        {children}
        <Picker setIndex={setIndex} theme={activeTheme} setActiveTheme={setActiveTheme} />
      </ThemeProvider>
    </>
  )
}

Theme.propTypes = {
  children: PropTypes.node.isRequired
}

export { Theme }
