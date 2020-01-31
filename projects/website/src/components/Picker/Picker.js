import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { debounce } from 'throttle-debounce'
import { checkWindowExists } from '@utils/url'

import { PickerButton, StyledPicker } from './styled'

export const Picker = ({ name, shuffleIndex, setIndex }) => {
  const previous = e => {
    e.preventDefault()
    setIndex(-1)
  }

  const next = e => {
    e.preventDefault()
    setIndex(1)
  }
  return (
    <StyledPicker>
      {name && <strong>{name}</strong>}
      <PickerButton onClick={previous}>←</PickerButton>
      <PickerButton
        onClick={e => {
          e.preventDefault()
          shuffleIndex()
        }}
      >
        ↯
      </PickerButton>
      <PickerButton onClick={next}>→</PickerButton>
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
