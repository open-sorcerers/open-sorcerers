import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { above } from '@styles/media'
import { easeIn } from '@styles/animation'
import * as ℂ from '@styles/colors'
import { Box, Button } from 'rebass'
import { Label, Input } from '@rebass/forms'

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
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-left);
`

export const menuActive = css`
  background-color: ${ℂ.named.transparent};
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

export const PasswordButton = styled(Button)`
  width: 10%;
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

export const PasswordLabel = styled(Label)`
  width: 15%;
`
