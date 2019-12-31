import { Box } from 'rebass'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { above } from '@styles/media'
import { primary } from '@styles/colors'

import { easeIn, transitionEaseOut } from '@styles/animation'

export const StyledNavigation = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #409;
  color: #fff;
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
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 900;
  &:hover {
    text-decoration: none;
  }

  svg {
    display: flex;
    fill: white;
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
  margin: 0 -24px;
  overflow: hidden;
  ${above.MID_TABLET(`
    margin: 0;
    flex-direction: row;
    height: 3rem;
  `)}
`

export const activeItemHover = css`
  opacity: 1;
  color: #fff;
  a {
    text-shadow: 0;
  }
  text-decoration: none;
`

export const Item = styled(Link)`
  ${transitionEaseOut('0.3s', ['opacity', 'color'])};
  font-family: obviously, sans-serif;
  font-style: ${p => (!p.isActive ? 'italic' : 'normal')};
  letter-spacing: 0.15em;
  font-weight: 900;
  padding: 0 0.5rem;
  color: #fff;
  margin: 1rem auto;
  font-size: 2.2rem;
  line-height: 0.75rem;
  opacity: ${p => (p.isActive ? '1' : '0.6')};
  text-decoration: none;

  &:hover {
    ${activeItemHover}
  }
  ${above.SMALL_PHONE(`
   font-size: 3rem;
    margin: 0.5rem auto; 
    line-height: 2.2rem;
  `)}
  ${above.TABLET_PORTRAIT(`
    padding: 0 0.5rem;
  `)}
  ${above.MID_TABLET(`
    font-size: 2.6rem;
    padding: 0;
    margin: 0 0.5rem;
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
