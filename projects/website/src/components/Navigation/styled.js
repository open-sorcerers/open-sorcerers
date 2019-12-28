import { Box } from 'rebass'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { minBreak, maxBreak } from '@styles/media'
import { primary } from '@styles/colors'

import { easeIn, transitionEaseOut } from '@styles/animation'

export const StyledNavigation = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #409;
  color: #fff;
  height: 22rem;
  min-height: 16rem;
  transition: ${easeIn('0.6s', ['background', 'padding', 'border'])};
`

export const Inner = styled(Box)`
  display: flex;
  flex-flow: row;
`

export const Brand = styled(Link)`
  display: flex;
  align-items: center;
  flex: 0 0 auto;
  color: #fff;
  font-size: 20px;
  line-height: 24px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 900;

  svg {
    fill: white;
    height: 160px;
    margin-top: 1rem;
  }

  ${maxBreak.S(`
    margin: 8px 0;
    justify-content: center;
  `)}

  :hover {
    text-decoration: none;
  }
`

export const Nav = styled(Box)`
  display: flex;
  flex-flow: nowrap column;
  flex: 1 1 auto;
  align-items: center;
  font-family: 'Obviously', sans-serif;
  font-style: italic;

  ${maxBreak.S(`
    margin: 0 -24px;
    justify-content: center;
    overflow-x: auto;
  `)}
  ${minBreak.S(`
    flex-direction: row;
  `)}
`

export const Item = styled(Link)`
  ${transitionEaseOut('0.3s', ['opacity', 'color'])};
  font-family: 'Obviously', sans-serif;
  font-style: italic;
  padding: 16px 8px;
  color: #fff;
  font-weight: 900;
  font-size: 2.6rem;
  line-height: 24px;
  opacity: ${p => (p.isActive ? '1' : '0.6')};
  text-decoration: none;

  :hover {
    opacity: 1;
    color: #ff0;
    text-decoration: none;
  }
  ${maxBreak.S(`
    padding: 8px;
  `)}
  ${minBreak.S(`
    font-size: 3.6rem;
  `)}
`

export const activeNav = css`
  padding-right: 0;
  padding-left: 0;
`
export const inactiveNav = css`
  padding: 0;
  ${minBreak.S(`
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
`
