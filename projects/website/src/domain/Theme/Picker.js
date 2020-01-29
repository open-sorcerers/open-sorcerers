import React from 'react'
import PropTypes from 'prop-types'

import { StyledPicker, Prev, Shuffle, Next } from './styled'

export const Picker = () => (
  <StyledPicker>
    <Prev>{'←'}</Prev>
    {' / '}
    <Shuffle>{'↯'}</Shuffle>
    {' / '}
    <Next>{'→'}</Next>
  </StyledPicker>
)

Picker.propTypes = {
  // whatever: PropTypes.string,
  // isWhatever: PropTypes.bool,
  children: PropTypes.node
}

export default Picker
