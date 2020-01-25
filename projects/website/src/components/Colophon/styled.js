import styled from '@emotion/styled'
import { Box } from 'rebass'

import { ifElse, pathOr } from 'ramda'

import { above } from '@styles/media'
import { Z_INDEX } from '@styles/constants'
import * as ℂ from '@styles/colors'
import { lighten } from 'polished'

export const StyledColophon = styled(Box)`
  width: 100%;
  background-color: ${ℂ.area.colophon.b};
  color: ${ℂ.area.colophon.f};
  text-align: center;
  ${above.SUB_TABLET(`
    margin-bottom: ${p => (p.hasContent ? '1rem' : '0')};
    background-color: ${lighten(1 / 10, ℂ.area.colophon.b)};
  `)}
`

export const AltColophon = styled(Box)`
  width: 75%;
  height: 11.5rem;
  border: 0 solid transparent;
  border-top: 8rem solid ${ℂ.area.colophon.alt.b};
  line-height: 2.5rem;
  background-color: ${ℂ.area.colophon.alt.b};
  color: ${ℂ.area.colophon.alt.f};
  transform: rotate(-14.5deg);
  position: absolute;
  left: -15rem;
  top: 6rem;
  z-index: ${Z_INDEX.MENU_UNDER};
  border-radius: 0.2rem 10rem;
  position: absolute;
  text-align: center;
  display: flex;
  flex-direction: column;
  ${above.SUB_TABLET(`
    background-color: ${lighten(1 / 10, ℂ.area.colophon.alt.b)};
  `)}
`

export const LinkAuthor = styled(Box)`
  display: inline-block;
  margin: 0.5rem;
`
export const LinkGithub = styled(Box)`
  display: inline-block;
  margin: 0.5rem;
`
