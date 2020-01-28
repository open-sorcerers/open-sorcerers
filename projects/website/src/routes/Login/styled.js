import styled from '@emotion/styled'
import { Box, Button } from 'rebass'
import { pathOr } from 'ramda'

const grab = pathOr('lime')

export const StyledLogin = styled(Box)`
  width: 100%;
  max-width: 800px;
  min-height: 20rem;
  padding: 5rem;
  text-align: center;
  margin: 0 auto;
`
const back = grab(['theme', 'colors', 'ui', 'button', 'b'])
const front = grab(['theme', 'colors', 'ui', 'button', 'f'])
const activeBack = grab(['theme', 'colors', 'ui', 'button', 'a', 'b'])
const activeFront = grab(['theme', 'colors', 'ui', 'button', 'a', 'f'])
export const LoginButton = styled(Button)`
  margin: 0 auto;
  margin-top: 1rem;
  display: block;
  cursor: pointer;
  text-transform: uppercase;
  background-color: ${back};
  color: ${front};
  border: 1px solid ${back};
  &:hover {
    background-color: ${activeBack};
    color: ${activeFront};
    border: 1px solid ${activeFront};
  }
`
