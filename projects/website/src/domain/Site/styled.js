import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { above } from '@styles/media'
import { easeIn } from '@styles/animation'
import { transparent} from '@styles/colors'
import { Box, Button } from 'rebass'
import { Label, Input } from '@rebass/forms'
import { pathOr } from 'ramda'
const grab = pathOr('lime')

export const Main = styled(Box)`
  margin: 2rem 0;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-left);
  min-height: calc(100vh - 20rem);
  ${above.TABLET_PORTRAIT(`margin: 0 auto`)}
`
const eased = easeIn('0.6s', ['position', 'top', 'left', 'padding'])

export const site = css`
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  top: 0;
  position: relative;
  transition: ${eased};
`

export const menuActive = css`
  background-color: ${transparent};
  ${above.TABLET_PORTRAIT(`padding-right: 40vw;`)}
  ${above.TABLET_LANDSCAPE(`padding-right: 33vw;`)}
`

export const PasswordField = styled(Box)`
  display: flex;
  flex-direction: row;

  align-items: center;
`

export const PasswordProtected = styled(Box)`
  max-width: 50rem;
  margin: 0 auto;
  font-family: obviously-narrow, 'Obviously', sans-serif;
  font-weight: 500;
  text-transform: uppercase;
  font-style: italic;
  min-height: 10rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  h1 {
    margin-bottom: 2rem;
  }
  input,
  button {
    display: inline-block;
  }
  button {
    margin-left: 1rem;
  }
`

export const PasswordInput = styled(Input)`
  width: 75%;
`

const button = grab(['theme', 'colors', 'ui', 'button', 'f'])
const buttonBack = grab(['theme', 'colors', 'ui', 'button', 'b'])
const activeButton = grab(['theme', 'colors', 'ui', 'button', 'a', 'f'])
const activeButtonBack = grab(['theme', 'colors', 'ui', 'button', 'a', 'b'])

export const PasswordButton = styled(Button)`
  width: 10%;
  cursor: pointer;
  text-transform: uppercase;
  background-color: ${buttonBack};
  color: ${button};
  border: 1px solid ${buttonBack};
  &:hover {
    background-color: ${activeButtonBack};
    color: ${activeButton};
    border: 1px solid ${activeButton};
  }
`

export const PasswordLabel = styled(Label)`
  width: 15%;
`
