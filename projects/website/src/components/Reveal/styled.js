import styled from '@emotion/styled'
import { Button } from 'rebass'

import * as ℂ from '@styles/colors'

export const StyledReveal = styled(Button)`
  width: 100%;
  padding: 0;
  padding-bottom: 0.5rem;
  display: inline-block;
  background-color: ${ℂ.tertiary};
  color: ${ℂ.secondary};
  text-transform: uppercase;
  font-family: obviously-narrow, sans-serif;
  font-weight: 900;
  font-size: 2rem;
  min-height: 2rem;
  text-align: center;
  vertical-align: middle;
  height: 3rem;
  cursor: pointer;
  transition: background 0.3s ease-out, color 0.3s ease-out, border 0.3 ease-out;
  border: 3px dashed transparent;
  &:hover {
    color: ${ℂ.tertiary};
    background-color: ${ℂ.secondary};
    border-color: ${ℂ.tertiary};
  }
`
