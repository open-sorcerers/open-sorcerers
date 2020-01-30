import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { PickerButton, StyledPicker } from './styled'

export const Picker = ({ name, shuffleIndex, theme, setIndex }) => {
  console.log('theme', theme)
  useEffect(() => {
    theme = window.localStorage.getItem('theme')
  })
  return (
    <StyledPicker>
      {name && <strong>{name}</strong>}
      <PickerButton
        onClick={e => {
          e.preventDefault()
          console.log('back!')
          setIndex(-1)
        }}
      >
        ←
      </PickerButton>
      {' / '}
      <PickerButton
        onClick={e => {
          e.preventDefault()
          shuffleIndex()
        }}
      >
        ↯
      </PickerButton>
      {' / '}
      <PickerButton
        onClick={e => {
          e.preventDefault()
          console.log('forward!')
          setIndex(1)
        }}
      >
        →
      </PickerButton>
    </StyledPicker>
  )
}

Picker.propTypes = {
  theme: PropTypes.object,
  setIndex: PropTypes.func,
  name: PropTypes.string,
  shuffleIndex: PropTypes.func
}

export default Picker
