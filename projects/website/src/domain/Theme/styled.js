import styled from '@emotion/styled'
import { Box } from 'rebass'
import { pathOr } from 'ramda'

const grab = pathOr('lime')

const picker = grab(['theme', 'colors', 'ui', 'picker', 'f'])
const pickerB = grab(['theme', 'colors', 'ui', 'picker', 'b'])
const pickerA = grab(['theme', 'colors', 'ui', 'picker', 'a', 'f'])
const pickerAF = grab(['theme', 'colors', 'ui', 'picker', 'a', 'f'])
export const StyledPicker = styled(Box)`
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  width: 8rem;
  height: 1rem;
  line-height: 1rem;
  color: ${picker};
  background-color: ${pickerB};
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
`

export const Next = styled(Box)``
export const Prev = styled(Box)``
export const Shuffle = styled(Box)``
