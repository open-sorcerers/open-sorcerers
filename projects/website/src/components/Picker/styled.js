import styled from '@emotion/styled'
import { Box } from 'rebass'
import { Z_INDEX } from '@styles/constants'
import { pathOr } from 'ramda'

const grab = pathOr('lime')

const picker = grab(['theme', 'colors', 'ui', 'picker', 'f'])
const pickerE = grab(['theme', 'colors', 'cs', 'picker', 'b'])
const pickerB = grab(['theme', 'colors', 'ui', 'picker', 'b'])
const pickerA = grab(['theme', 'colors', 'ui', 'picker', 'a', 'f'])
const pickerAB = grab(['theme', 'colors', 'ui', 'picker', 'a', 'b'])

const narrow = pathOr('Comic Sans MS', ['theme', 'fonts', 'obviouslyNarrow'])

export const StyledPicker = styled(Box)`
  ${narrow}
  font-size: 1.5rem;
  display: flex;
  flex-direction: row;
  min-width: 12rem;
  height: 3rem;
  padding: 0 0.5rem;
  line-height: 3rem;
  color: ${picker};
  background-color: ${pickerE};
  position: relative;
  border-radius: 100rem;
  justify-content: space-between;
  margin: 0 auto 0.5rem;
  z-index: ${Z_INDEX.FLOATING};
  align-items: center;
  strong {
    margin-right: 0.5rem;
    text-transform: uppercase;
    font-size: 0.75rem;
    line-height: 0.75rem;
    letter-spacing: 0.01rem;
  }
`

export const PickerButton = styled(Box)`
  width: 1.5rem;
  height: 1.5rem;
  line-height: 0.8rem;
  text-align: center;
  color: ${picker};
  background-color: ${pickerB};
  border-radius: 100rem;
  &:hover {
    color: ${pickerA};
    background-color: ${pickerAB};
  }
`
