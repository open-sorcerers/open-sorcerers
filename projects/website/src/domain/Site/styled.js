import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { above } from '@styles/media'
import { easeIn } from '@styles/animation'
import * as ℂ from '@styles/colors'
import { Box } from 'rebass'

export const Main = styled(Box)`
  margin: 2rem 0;
  min-height: calc(100vh - 20rem);
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
  background-color: ${ℂ.transparent};
  ${above.TABLET_PORTRAIT(`padding-right: 40vw;`)}
  ${above.TABLET_LANDSCAPE(`padding-right: 33vw;`)}
`