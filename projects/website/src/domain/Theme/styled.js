import styled from '@emotion/styled'
import { Box, Button } from 'rebass'
import { Z_INDEX } from '@styles/constants'
import { pathOr } from 'ramda'

const grab = pathOr('lime')

const picker = grab(['theme', 'colors', 'ui', 'picker', 'f'])
const pickerE = grab(['theme', 'colors', 'cs', 'picker', 'b'])
const pickerB = grab(['theme', 'colors', 'ui', 'picker', 'b'])
const pickerA = grab(['theme', 'colors', 'ui', 'picker', 'a', 'f'])
const pickerAB = grab(['theme', 'colors', 'ui', 'picker', 'a', 'b'])
export const StyledPicker = styled(Box)`
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  width: 8rem;
  height: 3rem;
  line-height: 3rem;
  color: ${picker};
  background-color: ${pickerE};
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
  border-radius: 100rem;
  justify-content: center;
  z-index: ${Z_INDEX.FLOATING};
  align-items: center;
`

export const PickerButton = styled(Box)`
  width: 1.5rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  color: ${picker};
  background-color: ${pickerB};
  border-radius: 100rem;
  &:hover {
    color: ${pickerA};
    background-color: ${pickerAB};
  }
`
