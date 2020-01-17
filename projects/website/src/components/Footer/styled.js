import styled from '@emotion/styled'
import { withTheme } from 'emotion-theming'
import { Box } from 'rebass'
import * as ℂ from '@styles/colors'
import { above } from '@styles/media'

export const StyledFooter = withTheme(styled(Box)`
  padding: 1.5rem 0;
  background-color: ${ℂ.quaternary};
  transform: background 0.3s ease-out, height 0.3s ease-out;
  border-top: 1px solid rgba(0, 0, 0, 0.38);
  color: ${ℂ.secondary};
  font-size: 0.9rem;
  line-height: 1.5rem;
  padding-bottom: 2rem;

  a {
    color: ${ℂ.secondary};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }
`)

export const HiddenContent = styled(Box)`
  padding: 1rem 0;
  width: 100%;
  heigth: 2rem;
  text-align: center;
  margin: 0 auto;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  line-height: 2rem;
  #current-date {
    color: cyan;
  }
  #environment {
    color: yellow;
  }
  .brain {
    font-size: 3rem;
    margin: 1rem;
    text-shadow: 0 0 3rem magenta, 0 0 1.5rem yellow, 0 0 5px white, 0 0 1px white;
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

    > *:first-child {
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

    > *:first-child {
      margin-right: 8px;
    }
`)}
`
