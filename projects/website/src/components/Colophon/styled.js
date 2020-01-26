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
  display: flex;
  flex-direction: column;
  a {
    svg {
      margin-top: 0.25rem;
    }
  }
  ${above.SMALL_PHONE(`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 0.5rem 0;
  `)}
  ${above.SUB_TABLET(`
    margin-bottom: ${p => (p.hasContent ? '1rem' : '0')};
    background-color: ${lighten(1 / 10, ℂ.area.colophon.b)};
  `)}
`

export const AltColophon = styled(Box)`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 2rem;
  border-top: 1px solid ${ℂ.area.colophon.alt.f};
  background-color: ${ℂ.area.colophon.alt.b};
  color: ${ℂ.area.colophon.alt.f};
  justify-content: space-around;
  text-align: center;
  transition: width 0.3s ease-out, height 0.3s ease-out, opacity 0.3s ease-out;
  a {
    display: flex;
    flex-direction: row;
    svg {
      padding: 0.1rem 0;
    }
  }
  ${above.SMALL_PHONE(`
    flex-direction: row;
    height: 2rem;
    line-height: 2rem;
    opacity: 1;
    a { svg { padding: 0.4rem 0; } }
  `)}
  ${above.TABLET_PORTRAIT(`
    justify-content: center;
  `)}
  ${above.SUB_TABLET(`
    margin: 1rem auto;
    height: 2.5rem;
    line-height: 2.35rem;
    width: 50%;
    min-width: 40rem;
    max-width: 50rem;
  border: 1px solid ${ℂ.area.colophon.alt.f};
    border-radius: 10rem;
    justify-content: space-around;
  `)}
`

export const AltWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  font-size: 0.8rem;
  margin: 0 0.5rem;
  svg {
    transition: fill 0.3s ease-out;
    fill: ${ℂ.ui.colophonLink.f};
  }
  a:hover {
    svg {
      fill: ${ℂ.ui.colophonLink.a.f};
    }
  }
  ${above.TABLET_PORTRAIT(`
    margin: 0 0.5rem;
  `)}
  &.author {
    a {
      margin-left: 0.25rem;
    }
  }
  &.source {
    align-self: center;
  }
`

export const LinkWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.8rem;
  margin: 0 0.5rem;
  align-items: baseline;
  svg {
    transition: fill 0.3s ease-out;
    fill: ${ℂ.ui.colophonLink.f};
  }
  a:hover {
    svg {
      fill: ${ℂ.ui.colophonLink.a.f};
    }
  }
  ${above.TABLET_PORTRAIT(`
    margin: 0 0.5rem;
  `)}
  &.author, &.source {
    a {
      margin-left: 0.25rem;
    }
  }
`
