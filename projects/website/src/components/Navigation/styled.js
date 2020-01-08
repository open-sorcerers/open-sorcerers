import { Box } from 'rebass'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'

import { above, aboveCalc } from '@styles/media'
import { easeIn, transitionEaseOut } from '@styles/animation'
import { primary, secondary, tertiary } from '@styles/colors'

/*
import { pathOr } from 'ramda'
const colors = {
  primary: pathOr(primary, ['theme', 'colors', 'core', 'primary']),
  secondary: pathOr(secondary, ['theme', 'colors', 'core', 'secondary'])
}
*/

export const StyledNavigation = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${primary};
  color: ${secondary};
  min-height: 16rem;
  transition: ${easeIn('0.6s', ['background', 'padding', 'border', 'min-height'])};
  ${above.SMALL_PHONE(`
    min-height: 18rem;
  `)}
  ${above.MID_TABLET(`
    min-height: 13rem;
  `)}
`

export const Inner = styled(Box)`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
`

export const Brand = styled(Link)`
  display: flex;
  width: 50%;
  height: 100%;
  flex: 0 0 auto;
  color: ${secondary};
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 900;
  &:hover {
    text-decoration: none;
  }

  svg {
    display: flex;
    fill: ${secondary};
    height: 6rem;
    margin: 1rem auto;
    ${transitionEaseOut('0.3s', ['height', 'width', 'margin'])}
  }

  ${above.SMALL_PHONE(`
    width: 60%;
    margin: 0;
    padding: 0;
    svg {
      height: 9rem;
      width: 100%;
      margin: 0;
      padding: 0;
    }
  `)}
  ${above.TABLET_PORTRAIT(`
    width: 55%;
    margin: 0.5rem 0;
    justify-content: center;
  `)}
  ${above.MID_TABLET(`
    margin: 0.5rem 2rem;
    width: 28%;
  `)}
`

export const Nav = styled(Box)`
  align-items: center;
  display: flex;
  flex-flow: nowrap column;
  flex: 1 1 auto;
  font-family: obviously, sans-serif;
  font-style: italic;
  font-weight: 900;
  justify-content: center;
  margin: 0 -1.5rem;
  overflow: hidden;
  ${above.MID_TABLET(`
    margin: 0;
    flex-direction: row;
    height: 5rem;
    align-items: flex-start;
  `)}
`

export const activeItemHover = css`
  opacity: 1;
  color: #fff;
  text-decoration: none;

`

export const StyledItem = styled(Link)`
  ${transitionEaseOut('0.3s', ['opacity', 'color'])};
  color: ${secondary};
  font-family: obviously, sans-serif;
  font-size: 2.2rem;
  font-style: ${p => (!p.isActive ? 'italic' : 'normal')};
  font-weight: 900;
  letter-spacing: 0.05em;
  line-height: 0.75rem;
  margin: 1rem auto;
  opacity: ${p => (p.isActive ? '1' : '0.6')};
  padding: 0 0.5rem;
  text-decoration: none;

  &:hover {
    color: ${tertiary};
    opacity: 1;
  }

  ${above.SMALL_PHONE(`
    font-size: 3rem;
    margin: 0.5rem auto; 
    line-height: 2.2rem;
  `)}
  ${above.TABLET_PORTRAIT(`
    padding: 0 0.5rem;
    vertical-align: top;
  `)}
  ${above.MID_TABLET(`
    font-size: 2.6rem;
    padding: 0;
    margin: 0 0.5rem;
  `)}
  ${aboveCalc.TABLET_LANDSCAPE('6rem')(`
    font-size: 3.3rem;
    margin: 0.5rem auto;
  `)}
`

export const activeNav = css`
  padding-right: 0;
  padding-left: 0;
`
export const inactiveNav = css`
  padding: 0;
  ${above.TABLET_PORTRAIT(`
  border-left: 12vw solid ${primary};
  margin-left: -12vw;
  `)}
`

export const MenuWrapper = styled.div`
  text-align: center;
  margin: 0;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  ${above.MID_TABLET(`
    position: absolute;
  `)}
`
