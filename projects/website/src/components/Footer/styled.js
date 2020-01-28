import styled from '@emotion/styled'
import { withTheme } from 'emotion-theming'
import { Box } from 'rebass'
import { lighten } from 'polished'
import { pathOr, pipe } from 'ramda'

import { above } from '@styles/media'
const grab = pathOr('lime')

const footerColor = grab(['theme', 'colors', 'cs', 'footer', 'f'])
const footerActiveColor = grab(['theme', 'colors', 'cs', 'footer', 'f'])

const footerLink = pipe(footerColor, lighten(1 / 10))
const footerActiveLink = pipe(footerActiveColor, lighten(1 / 10))

export const StyledFooter = withTheme(styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 1.5rem 0;
  background-color: ${grab(['theme', 'colors', 'cs', 'footer', 'b'])};
  transition: background 0.3s ease-out, height 0.3s ease-out;
  border-top: 1px solid rgba(0, 0, 0, 0.38);
  color: ${footerColor};
  font-size: 0.9rem;
  line-height: 1.5rem;
  padding-bottom: 2rem;
  a {
    transition: color 0.3s ease-in;
    color: ${footerLink};
    text-decoration: none;

    &:hover {
      color: ${footerActiveLink};
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

const footerDate = grab(['theme', 'colors', 'cs', 'footerHiddenDate', 'f'])
const footerEnv = grab(['theme', 'colors', 'cs', 'footerHiddenEnv', 'f'])
export const HiddenContent = styled(Box)`
  padding: 1rem 0;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  line-height: 2rem;
  #current-date {
    color: ${footerDate};
  }
  #environment {
    color: ${footerEnv};
  }
  .brain {
    font-size: 3rem;
    margin: 1rem;
    text-shadow: 0 0 3rem magenta, 0 0 1.5rem cyan, 0 0 5px white, 0 0 1px yellow;
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
