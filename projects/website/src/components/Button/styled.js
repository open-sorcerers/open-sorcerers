import styled from '@emotion/styled'
import { Button } from 'rebass'
import * as ℂ from '@styles/colors'

export const StyledButton = styled(Button)`
  padding: 4px 12px;
  margin: 0;
  background: none;
  border: none;
  border: 2px solid #663399;
  border-radius: 2px;
  color: ${ℂ.primary};
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.4px;
  line-height: 24px;
  text-transform: uppercase;
  transition: all ease-in-out 0.2s;
  transition-property: color, background-color;
  &:hover,
  &:focus {
    color: ${ℂ.AREA.CONTENT};
    background-color: ${ℂ.AREA.CONTENT_BG};
  }
`
