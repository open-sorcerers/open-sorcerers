import { Box } from 'rebass'
import styled from '@emotion/styled'
import { css } from '@emotion/core'
import { Link } from 'gatsby'
import { pathOr } from 'ramda'

import { Z_INDEX } from '@styles/constants'

import { mq, __ } from '@styles/media'
import { easeIn, transitionEaseOut } from '@styles/animation'
const grab = pathOr('lime')

const styledNav = mq({
  minHeight: ['16rem', '18rem', __, __, '13rem']
})

export const StyledNavigation = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${grab(['theme', 'colors', 'cs', 'nav', 'b'])};
  color: ${grab(['theme', 'colors', 'cs', 'nav', 'f'])};
  min-height: 16rem;
  position: relative;
  z-index: ${Z_INDEX.MENU};
  transition: ${easeIn('0.6s', ['background', 'padding', 'border', 'min-height'])};
  ${styledNav}
`

export const Inner = styled(Box)`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
`

const brand = mq({
  width: ['50%', '60%', '55%', __, '28%'],
  margin: ['initial', '0', '0.5rem 0', __, '0.5rem 2rem'],
  justifyContent: ['initial', __, 'center'],
  padding: ['initial', '0'],
  svg: {
    height: ['9rem', __, '12rem'],
    width: ['100%'],
    margin: ['initial', '0'],
    padding: ['initial', '0']
  }
})

export const Brand = styled(Link)`
  display: flex;
  width: 50%;
  height: 100%;
  flex: 0 0 auto;
  color: ${grab(['theme', 'colors', 'ui', 'brand', 'f'])};
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 900;

  svg {
    display: flex;
    fill: ${grab(['theme', 'colors', 'ui', 'brand', 'f'])};
    height: 9rem;
    margin: 0;
    ${transitionEaseOut('0.1s', ['fill', 'height', 'width', 'margin'])}
  }
  &:hover {
    text-decoration: none;
    svg {
      fill: ${grab(['theme', 'colors', 'ui', 'brand', 'a', 'f'])};
    }
  }
  ${brand}
`

const nav = mq({
  margin: ['0 -1.5rem', __, __, __, '0'],
  flexDirection: ['column', __, __, __, 'row'],
  height: ['initial', __, __, __, '5rem'],
  alignItems: ['center', __, __, __, 'flex-start']
})

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
`

export const activeItemHover = css`
  opacity: 1;
  color: #fff;
  text-decoration: none;
`

const styledItem = mq({
  verticalAlign: ['initial', __, 'top'],
  fontSize: ['2.2rem', '3rem', __, __, '2.6rem', '3.3rem'],
  margin: ['1rem auto', '0.5rem auto', __, __, '0 0.5rem', '0.5rem auto'],
  lineHeight: ['0.75rem', '2.2rem'],
  padding: ['0 0.5rem', __, __, '0']
})

export const StyledItem = styled(Link)`
  ${transitionEaseOut('0.3s', ['opacity', 'color'])};
  color: ${grab(['theme', 'colors', 'ui', 'navButton', 'f'])};
  font-family: obviously, sans-serif;
  font-size: 2.2rem;
  font-style: ${p => (!p['data-active'] ? 'italic' : 'normal')};
  font-weight: 900;
  letter-spacing: 0.05em;
  line-height: 0.75rem;
  margin: 1rem auto;
  opacity: ${p => (p['data-active'] ? '1' : '0.6')};
  padding: 0 0.5rem;
  text-decoration: none;

  &:hover {
    color: ${grab(['theme', 'colors', 'ui', 'navButton', 'a', 'f'])};
    opacity: 1;
  }
`

export const activeNav = css`
  padding-right: 0;
  padding-left: 0;
`

const navInactive = mq({
  borderLeft: ['initial', __, '12vw solid transparent'],
  marginLeft: ['initial', __, '-12vw']
})

export const inactiveNav = css`
  padding: 0;
  ${navInactive}
`

const menuWrapper = mq({
  position: ['initial', __, __, __, 'absolute']
})

export const MenuWrapper = styled.div`
  text-align: center;
  margin: 0;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  ${menuWrapper}
`
