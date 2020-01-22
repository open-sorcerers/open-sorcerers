import styled from '@emotion/styled'
import { Box, Button } from 'rebass'
import * as ℂ from '@styles/colors'

export const StyledLogin = styled(Box)`
  width: 100%;
  max-width: 800px;
  min-height: 20rem;
  padding: 5rem;
  text-align: center;
  margin: 0 auto;
`

export const LoginButton = styled(Button)`
  margin: 0 auto;
  margin-top: 1rem;
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  background-color: ${ℂ.ui.button.b};
  color: ${ℂ.ui.button.f};
  border: 1px solid ${ℂ.ui.button.b};
  &:hover {
    background-color: ${ℂ.ui.button.a.b};
    color: ${ℂ.ui.button.a.f};
    border: 1px solid ${ℂ.ui.button.a.f};
  }
`
