import styled from '@emotion/styled'
import { Box } from 'rebass'

import { above } from '@styles/media'
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
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 2rem;
  border-top: 1px solid ${ℂ.area.colophon.alt.f};
  background-color: ${ℂ.area.colophon.alt.b};
  color: ${ℂ.area.colophon.alt.f};
  justify-content: space-around;
  text-align: center;
  height: 0;
  transition: width 0.3s ease-out, height 0.3s ease-out, opacity 0.3s ease-out;
  opacity: 0;
  ${above.SMALL_PHONE(`
  height: 2rem;
  line-height: 2rem;
    opacity: 1;
  `)}
  ${above.TABLET_PORTRAIT(`
    justify-content: center;
  `)}
  ${above.SUB_TABLET(`
    background-color: ${lighten(1 / 10, ℂ.area.colophon.alt.above.subTablet.b)};
    margin: 1rem auto;
    height: 2.5rem;
    width: 20rem;
    border-top: 1px solid transparent;
    border-radius: 10rem;
    justify-content: space-around;
  `)}
`

export const LinkWrapper = styled(Box)`
  display: inline-block;
  ${above.TABLET_PORTRAIT(`
  margin: 0 0.5rem;
  `)}
`
