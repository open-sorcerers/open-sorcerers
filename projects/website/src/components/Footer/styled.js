import styled from '@emotion/styled'
import { withTheme } from 'emotion-theming'
import { Box } from 'rebass'
import { lighten } from 'polished'

import * as ℂ from '@styles/colors'
import { above } from '@styles/media'

export const StyledFooter = withTheme(styled(Box)`
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
  flex-flow: nowrap row;
  ${above.TABLET_PORTRAIT(`
    flex-flow: nowrap column;`)}
`

export const Left = styled(Box)`
  margin-right: auto;
  ${above.TABLET_PORTRAIT(`
    margin: 0;
    display: flex;
    flex-flow: nowrap row;
    justify-content: center;
    text-align: center;

    > *:first-of-type {
      margin-right: 8px;
    }
  `)}
`

export const Right = styled(Box)`
  margin-left: auto;
  text-align: right;
  ${above.TABLET_PORTRAIT(`
    margin: 0;
    display: flex;
    flex-flow: nowrap row;
    justify-content: center;
    text-align: center;

    > *:first-of-type {
      margin-right: 8px;
    }
`)}
`
