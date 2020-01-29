import React from 'react'
import PropTypes from 'prop-types'

import { StyledPicker, Prev, Shuffle, Next } from './styled'

export const Picker = ({ theme, setActiveTheme, previousTheme, nextTheme }) => (
  <StyledPicker>
    {theme && theme.name && <strong>{theme.name}</strong>}
    <Prev onClick={previousTheme}>{'←'}</Prev>
    {' / '}
    <Shuffle>{'↯'}</Shuffle>
    {' / '}
    <Next onClick={nextTheme}>{'→'}</Next>
  </StyledPicker>
)

Picker.propTypes = {
  theme: PropTypes.object,
  setActiveTheme: PropTypes.func,
  nextTheme: PropTypes.func,
  previousTheme: PropTypes.func
}

export default Picker
