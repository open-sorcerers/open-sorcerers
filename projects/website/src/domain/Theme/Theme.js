import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'emotion-theming'
import { checkWindowExists } from '@utils/url'
import { fromPairs, toPairs } from 'ramda'
/* import preset from '@rebass/preset' */

import makeTheme from '@styles/theme'
import PALETTES from '@styles/palettes'

import { BaseCSS } from './BaseCSS'
import Picker from './Picker'

const Theme = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const palette = PALETTES[activeIndex]
  const shuffleIndex = () => {
    const input = PALETTES[activeIndex]
    const parts = toPairs(input)
    for (let i = 0; i < parts.length - 1; i++) {
      const x = Math.round(Math.random() * parts.length - 1)
      const copy = parts[i]
      const other = parts[x]
      if (parts[i][0] !== 'name' && other[0] !== 'name') {
        parts[i][1] = other[1]
      }
      if (parts[x][0] !== 'name' && copy[0] !== 'name') {
        parts[x][1] = copy[1]
      }
    }
    const shuffled = fromPairs(parts)
    console.log('before', input, 'shuffled!', shuffled)
    setActiveTheme(shuffled)
  }
  const setIndex = x => {
    const index =
      activeIndex + x > 0 && activeIndex < PALETTES.length
        ? (activeIndex + x) % PALETTES.length
        : PALETTES.length - 1
    setActiveIndex(index)
    const active = makeTheme(PALETTES[index])
    setActiveTheme(active)
    if (checkWindowExists()) {
      if (
        !window.localStorage.getItem('themePalette') ||
        window.localStorage.getItem('themePalette') !== index
      ) {
        window.localStorage.setItem('themePalette', '' + index)
      }
    }
  }
  let theme = makeTheme(palette)

  const [activeTheme, setActiveTheme] = useState(theme)
  useEffect(() => {
    const index = parseInt(window.localStorage.getItem('themePalette'))
    if (index !== activeIndex) {
      setIndex(index)
    }
  })
  return (
    <>
      <ThemeProvider theme={activeTheme}>
        <BaseCSS theme={activeTheme} />
        {children}
        <Picker
          shuffleIndex={shuffleIndex}
          setIndex={setIndex}
          theme={activeTheme}
          setActiveTheme={setActiveTheme}
        />
      </ThemeProvider>
    </>
  )
}

Theme.propTypes = {
  children: PropTypes.node.isRequired
}

export { Theme }
