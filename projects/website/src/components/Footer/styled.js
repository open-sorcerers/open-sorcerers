import styled from '@emotion/styled'
import { withTheme } from 'emotion-theming'
import { Box } from 'rebass'
import { lighten } from 'polished'

import * as ℂ from '@styles/colors'
import { above } from '@styles/media'

export const StyledFooter = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  background-color: ${ℂ.area.footer.b};
  transition: background 0.3s ease-out, height 0.3s ease-out;
  border-top: 1px solid rgba(0, 0, 0, 0.38);
  color: ${ℂ.area.footer.f};
  font-size: 0.9rem;
  line-height: 1.5rem;
  padding-bottom: 2rem;
  a {
    transition: color 0.3s ease-in;
    color: ${lighten(1 / 10, ℂ.ui.footer.link.f)};
    text-decoration: none;

    &:hover {
      color: ${lighten(1 / 10, ℂ.ui.footer.link.a.f)};
      text-decoration: underline;
    }
  }
  ${above.TABLET_PORTRAIT(`
    padding: 1rem auto;
  `)}
  ${above.SUB_TABLET(`
    padding: 0 auto;
  `)}
`)

export const HiddenContent = styled(Box)`
  padding: 1rem 0;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  line-height: 2rem;
  #current-date {
    color: ${ℂ.area.footer.hidden.date.f};
  }
  #environment {
    color: ${ℂ.area.footer.hidden.environment.f};
  }
  .brain {
    font-size: 3rem;
    margin: 1rem;
    text-shadow: 0 0 3rem ${ℂ.area.footer.hidden.brain.textShadow[0]},
      0 0 1.5rem ${ℂ.area.footer.hidden.brain.textShadow[1]}, 0 0 5px white,
      0 0 1px ${ℂ.area.footer.hidden.brain.textShadow[2]};
  }
  .version {
    font-size: 1.5rem;
  }
`

export const Inner = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
  vertical-align: middle;
  align-items: center;
  ${above.TABLET_PORTRAIT(
    `
    flex-direction: row;
    margin: 0 auto;
    width: 100%;
    justify-content: space-evenly;
    max-width: 34rem;
  `
  )}
`

export const Bottom = styled(Box)`
  text-align: center;
  display: block;
  margin: 0.5rem auto 0;
  width: 100%;
`

export const LinkWrapper = styled(Box)`
  margin: 0.5rem;
  display: inline-block;
  ${above.SMALL_PHONE(`
    margin: 0.5rem auto;
  `)}
`
