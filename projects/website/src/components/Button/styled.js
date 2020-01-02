import styled from '@emotion/styled'
import { Button } from 'rebass'
import * as ℂ from '@styles/colors'

export const StyledButton = styled(Button)`
  padding: 0.25rem 0.75rem;
  margin: 0;
  background: none;
  border: 2px solid ${ℂ.primary};
  border-radius: 2px;
  color: ${ℂ.primary};
  letter-spacing: 0.1rem;
  line-height: 1.5rem;
  text-transform: uppercase;
  transition: all ease-in-out 0.2s;
  transition-property: color, background-color;
  &:hover,
  &:focus {
    color: ${ℂ.AREA.CONTENT};
    background-color: ${ℂ.AREA.CONTENT_BG};
  }
`
